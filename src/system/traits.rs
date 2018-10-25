use std::borrow::Borrow;
use std::cell::Cell;
use std::collections::VecDeque;
use std::convert::AsRef;
use std::iter::{Fuse, IntoIterator, Map, Zip};
use std::marker::PhantomData;
use std::rc::Rc;
use std::slice::Iter;

use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

use std::ops::{Generator, GeneratorState};

use void::Void;

pub struct GameOver;

impl Into<GameOver> for Void {
    fn into(self) -> GameOver {
        unreachable!()
    }
}

pub trait Model<'m> {
    type Cmd;
    type State: IntoIterator<Item = Self::Update> + 'm;
    type Update;
    type Error: Into<GameOver>;

    fn initialize(&'m mut self) -> Self::State;

    fn step(&mut self, cmd: Option<Self::Cmd>) -> Result<Self::Update, Self::Error>;

    fn tear_down(&mut self);

    #[inline]
    fn make_game<E>(self, env: E) -> Box<Game<Self, E>>
    where
        Self: Sized,
        E: 'static,
    {
        Box::new(Game { model: self, env })
    }

    /*
     * #[inline]
     * fn join<R, F, T>(self, other: R, f: F) -> Join<Self, R, F>
     * where
     *     R: Model<'m, Cmd = Self::Cmd, Error = Void>,
     *     F: Fn((Self::Update, R::Update)) -> T + 'm,
     *     Self::Cmd: Copy,
     *     Self: Sized,
     * {
     *     Join {
     *         left: self,
     *         right: other,
     *         f,
     *     }
     * }
     */
}

pub trait Render {
    type Env;
    type Update;

    fn create(u: Self::Update, env: &mut Self::Env) -> Self;

    fn render(&mut self, env: &mut Self::Env) -> Option<()>;

    #[inline]
    fn render_into(self, env: &mut Self::Env) -> RenderGen<Self::Env, Self>
    where
        Self: Sized,
    {
        RenderGen {
            env,
            renderer: self,
        }
    }
}

pub trait CanvasTile {
    // normalized_progress 0 to 1 inclusive
    fn draw_tile(&self, gc: &CanvasRenderingContext2d, normalized_progress: f64);

    fn setup_canvas(&self, canvas: &HtmlCanvasElement);
}

/*
 * pub struct Join<L, R, F> {
 *     left: L,
 *     right: R,
 *     f: F,
 * }
 *
 * impl<'m, L, R, T, F> Model<'m> for Join<L, R, F>
 * where
 *     L: Model<'m>,
 *     R: Model<'m, Cmd = L::Cmd, Error = Void>,
 *     F: Fn((L::Update, R::Update)) -> T + 'm,
 *     L::Cmd: Copy,
 * {
 *     type Cmd = L::Cmd;
 *     type Update = T;
 *     type State = Map<Zip<Fuse<L::State>, Fuse<R::State>>, &'m F>;
 *     type Error = L::Error;
 *
 *     fn initialize(&'m mut self) -> Self::State {
 *         self.left
 *             .initialize()
 *             .fuse()
 *             .zip(self.right.initialize().fuse())
 *             .map(&self.f)
 *     }
 *
 *     fn step(&mut self, cmd: Option<Self::Cmd>) -> Result<Self::Update, Self::Error> {
 *         let ul = self.left.step(cmd)?;
 *         let ur = self.right.step(cmd).unwrap();
 *
 *         let update = (self.f)((ul, ur));
 *
 *         Ok(update)
 *     }
 *
 *     fn tear_down(&mut self) {
 *         self.right.tear_down();
 *         self.left.tear_down();
 *     }
 * }
 *
 */
pub struct Empty<C, U> {
    _cmd: PhantomData<C>,
    _update: PhantomData<U>,
}

impl<'m, C, U> Model<'m> for Empty<C, U>
where
    U: 'm,
{
    type Cmd = C;
    type Update = U;
    type Error = GameOver;
    type State = ::std::iter::Empty<U>;

    fn initialize(&'m mut self) -> Self::State {
        ::std::iter::empty()
    }

    fn step(&mut self, cmd: Option<Self::Cmd>) -> Result<Self::Update, Self::Error> {
        Err(GameOver)
    }

    fn tear_down(&mut self) {}
}

pub struct Replay<C, U> {
    _cmd: PhantomData<C>,
    updates: Vec<U>,
    index: usize,
}
impl<'m, C, U> Model<'m> for Replay<C, U>
where
    U: Clone + 'm,
{
    type Cmd = C;
    type Update = U;
    type Error = GameOver;
    type State = ::std::iter::Empty<U>;

    fn initialize(&'m mut self) -> Self::State {
        self.index = 0;
        ::std::iter::empty()
    }

    fn step(&mut self, _cmd: Option<Self::Cmd>) -> Result<Self::Update, Self::Error> {
        self.updates.get(self.index).cloned().ok_or(GameOver)
    }

    fn tear_down(&mut self) {}
}

pub struct RenderGen<'a, E, R> {
    env: &'a mut E,
    renderer: R,
}
impl<'a, E, R> Generator for RenderGen<'a, E, R>
where
    R: Render<Env = E>,
{
    type Yield = ();
    type Return = ();

    unsafe fn resume(&mut self) -> GeneratorState<Self::Yield, Self::Return> {
        match self.renderer.render(self.env) {
            Some(_) => GeneratorState::Yielded(()),
            _ => GeneratorState::Complete(()),
        }
    }
}

pub struct Game<M, E> {
    model: M,
    env: E,
}
impl<M, Cmd, U, E> Game<M, E>
where
    M: for<'m> Model<'m, Update = U, Cmd = Cmd>,
    // M: 'static, // nice to have, but since the code compiles..
    E: 'static,
    // U: ::std::fmt::Debug,
{
    #[allow(dead_code)]
    pub fn create<R, T>(self: Box<Self>) -> (Rc<Cell<T>>, impl Generator<Yield = (), Return = ()>)
    where
        R: Render<Env = E, Update = U>,
        T: Into<Option<Cmd>> + Copy + 'static + Default,
    {
        let this = Box::leak(self);
        let cell = Rc::new(Cell::new(T::default()));

        (cell.clone(), move || loop {
            {
                let iter = this.model.initialize();
                for u in iter {
                    let renderer = R::create(u, &mut this.env);
                    yield_from!(renderer.render_into(&mut this.env));
                }
            }

            loop {
                let update = cell.get().into();

                let u = this.model.step(update);

                if let Ok(u) = u {
                    let renderer = R::create(u, &mut this.env);
                    yield_from!(renderer.render_into(&mut this.env));
                } else {
                    break;
                }
            }

            this.model.tear_down();
        })
    }
}
