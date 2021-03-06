use std::f64::consts::PI;

use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

use constants::TILE_SIZE;
use data::{Direction, SmallNat};
use system::{Color, DrawGrid, UnitInterval};

pub struct CanvasEnv {
    canvas: HtmlCanvasElement,
    gc: CanvasRenderingContext2d,
    tile_size: f64,
    color: Color,
}
impl CanvasEnv {
    pub fn new() -> Self {
        let document = web_sys::window().unwrap().document().unwrap();
        let canvas = document
            .create_element("canvas")
            .unwrap()
            .dyn_into::<web_sys::HtmlCanvasElement>()
            .unwrap();

        (document.body().unwrap().as_ref() as &web_sys::Node)
            .append_child(canvas.as_ref() as &web_sys::Node)
            .unwrap();

        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        context.set_fill_style(&Color::Black.to_rgb().into());

        CanvasEnv {
            canvas,
            gc: context,
            tile_size: TILE_SIZE as f64,
            color: Color::Black,
        }
    }
}

impl DrawGrid for CanvasEnv {
    fn setup(
        &mut self,
        tile_size: SmallNat,
        width: SmallNat,
        height: SmallNat,
    ) {
        self.tile_size = tile_size as f64;

        let width_pixel: u32 = (width * tile_size) as u32;
        let height_pixel: u32 = (height * tile_size) as u32;

        self.canvas.set_width(width_pixel);
        self.canvas.set_height(height_pixel);

        self.gc.set_stroke_style(&"rgba(0, 0, 0, 0.02)".into());

        for x in 1..width {
            let x: f64 = (x * tile_size) as f64;
            self.gc.begin_path();
            self.gc.move_to(x, 0.0);
            self.gc.line_to(x, height_pixel as f64);
            self.gc.stroke();
        }

        for y in 1..height {
            let y: f64 = (y * tile_size) as f64;
            self.gc.begin_path();
            self.gc.move_to(0.0, y);
            self.gc.line_to(height_pixel as f64, y);
            self.gc.stroke();
        }
    }

    fn clear(&mut self) {
        self.gc.clear_rect(
            0.0,
            0.0,
            self.canvas.width() as f64,
            self.canvas.height() as f64,
        );
    }

    // returns current fill color
    fn set_fill_color(&mut self, color: Color) -> Color {
        let prev_color = self.color;
        self.color = color;
        self.gc.set_fill_style(&color.to_rgb().into());
        prev_color
    }

    #[inline(always)]
    fn fill_tile(
        &mut self,
        x: SmallNat,
        y: SmallNat,
        dir: Direction,
        size: UnitInterval,
    ) {
        let (x, y, w, h) = partial_tile(self.tile_size, x, y, dir, size);

        self.gc.fill_rect(x, y, w, h);
    }

    #[inline(always)]
    fn clear_tile(
        &mut self,
        x: SmallNat,
        y: SmallNat,
        dir: Direction,
        size: UnitInterval,
    ) {
        let (x, y, w, h) = partial_tile(self.tile_size, x, y, dir, size);

        self.gc.clear_rect(x, y, w, h);
        self.gc.stroke_rect(x, y, self.tile_size, self.tile_size);
    }

    fn circle(&mut self, x: SmallNat, y: SmallNat, radius: UnitInterval) {
        let x = x as f64 * self.tile_size;
        let y = y as f64 * self.tile_size;

        let r_full = self.tile_size / 2.0;
        let r = radius.scale(r_full);

        self.gc.begin_path();
        let _ = self.gc.arc(x + r_full, y + r_full, r, 0.0, 2.0 * PI);
        self.gc.fill();
    }

    fn show_game_over(&mut self) {
        // best effort of centering text
        let x = self.canvas.width() as f64 / 2.0 - 120.0;
        let y = self.canvas.height() as f64 / 2.0 - 24.0;

        self.gc.set_font("36px serif");
        let _ = self.gc.fill_text("Game Over", x, y);
    }
}

pub fn partial_tile(
    tile_size: f64,
    x: SmallNat,
    y: SmallNat,
    dir: Direction,
    size: UnitInterval,
) -> (f64, f64, f64, f64) {
    let x0 = x as f64 * tile_size;
    let y0 = y as f64 * tile_size;

    let long = tile_size;
    let short = size.scale(tile_size);

    let x;
    let y;
    let w;
    let h;

    match dir {
        Direction::East => {
            x = x0;
            y = y0;
            w = short;
            h = long;
        }
        Direction::West => {
            x = x0 + long - short;
            y = y0;
            w = short;
            h = long;
        }
        Direction::South => {
            x = x0;
            y = y0;
            w = long;
            h = short;
        }
        Direction::North => {
            x = x0;
            y = y0 + long - short;
            w = long;
            h = short;
        }
    }
    (x, y, w, h)
}
