(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{10:function(n,t,e){"use strict";e.r(t);var r=e(12),o=e(13),i=e.n(o);function a(n){return function(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function u(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function c(n,t,e){return t&&u(n.prototype,t),e&&u(n,e),n}function _(n,t){return document.addEventListener(n,t),function(){document.removeEventListener(n,t)}}var f=".keybox",d=function(){function n(){var t=this;s(this,n),this._listeners=[];var e=document.querySelector(f);if(!e)throw Error("Keybox element not on page");this._element=e,this._scale=1;var r=new i.a(this._element);r.get("pinch").set({enable:!0}),r.on("tap",function(n){2===n.tapCount&&(t._scale>1?t._zoomOut():t._zoomIn());var e=Number(n.target.dataset.keyCode);e&&t._emit("tap",e)}),r.on("press",function(n){var e=Number(n.target.dataset.keyCode);e&&t._emit("press",e)}),r.on("pressup",function(n){var e=Number(n.target.dataset.keyCode);e&&t._emit("pressup",e)})}return c(n,[{key:"_zoomIn",value:function(){this._scale<3?this._scale+=.5:this._scale=3,this._resize()}},{key:"_zoomOut",value:function(){this._scale>1?this._scale-=.5:this._scale=1,this._resize()}},{key:"_resize",value:function(){var n=24*this._scale;this._element.style.fontSize="".concat(n,"px")}},{key:"_emit",value:function(n,t){var e=this._listeners,r=a(this._listeners);this._listeners=r,e.forEach(function(e){return e({type:n,keyCode:t})})}},{key:"addKeyLisitener",value:function(n){var t=this;return this._listeners.push(n),function(){t._listeners=t._listeners.filter(function(t){return t!==n})}}}]),n}(),l=function(){function n(t){s(this,n),this._onEnterFrame=t,this._rafId=null,this._unlistens=[],this._key=0,this._isTap=!1,this._run=this._run.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._keybox=new d;var e=this._keybox.addKeyLisitener(this._onKeybox.bind(this));this._unlistens.push(e)}return c(n,[{key:"running",value:function(){return null!==this._rafId}},{key:"start",value:function(){return!this.running()&&(this._rafId=window.requestAnimationFrame(this._run),this._unlistens.push(_("keydown",this._onKeyDown)),this._unlistens.push(_("keyup",this._onKeyUp)),!0)}},{key:"stop",value:function(){return!!this.running()&&(this._rafId&&cancelAnimationFrame(this._rafId),this._rafId=null,this._unlistens.forEach(function(n){return n()}),this._unlistens.length=0,!0)}},{key:"_run",value:function(){if(this.running())try{this._onEnterFrame(this._key),this._rafId=window.requestAnimationFrame(this._run);for(var n=document.querySelectorAll(".key"),t=0;t<=n.length;t++){var e=n[t];if(e&&e.dataset)Number(e.dataset.keyCode)===this._key?e.classList.add("pressed"):e.classList.remove("pressed")}this._isTap&&(this._key=0,this._isTap=!1)}catch(n){console.error(n),this.stop()}}},{key:"_onKeybox",value:function(n){switch(n.type){case"tap":this._key=n.keyCode,this._isTap=!0;break;case"press":this._key=n.keyCode,this._isTap=!1;break;default:case"pressup":this._key=0}}},{key:"_onKeyDown",value:function(n){switch(n.keyCode){case 13:case 37:case 38:case 39:case 40:this._key=n.keyCode;break;case 87:case 75:this._key=38;break;case 74:case 83:this._key=40;break;case 72:case 65:this._key=37;break;case 76:case 68:this._key=39}}},{key:"_onKeyUp",value:function(n){this._key=0}}]),n}();function p(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=[],r=!0,o=!1,i=void 0;try{for(var a,s=n[Symbol.iterator]();!(r=(a=s.next()).done)&&(e.push(a.value),!t||e.length!==t);r=!0);}catch(n){o=!0,i=n}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return e}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function h(n){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}e.d(t,"__wbg_new_7733f9a79f16fcf3",function(){return C}),e.d(t,"__wbg_start_d02e687b09c37f58",function(){return x}),e.d(t,"main",function(){return D}),e.d(t,"__widl_instanceof_CanvasRenderingContext2D",function(){return k}),e.d(t,"__widl_f_begin_path_CanvasRenderingContext2D",function(){return R}),e.d(t,"__widl_f_fill_CanvasRenderingContext2D",function(){return O}),e.d(t,"__widl_f_stroke_CanvasRenderingContext2D",function(){return I}),e.d(t,"__widl_f_set_stroke_style_CanvasRenderingContext2D",function(){return S}),e.d(t,"__widl_f_set_fill_style_CanvasRenderingContext2D",function(){return A}),e.d(t,"__widl_f_arc_CanvasRenderingContext2D",function(){return z}),e.d(t,"__widl_f_line_to_CanvasRenderingContext2D",function(){return N}),e.d(t,"__widl_f_move_to_CanvasRenderingContext2D",function(){return q}),e.d(t,"__widl_f_clear_rect_CanvasRenderingContext2D",function(){return J}),e.d(t,"__widl_f_fill_rect_CanvasRenderingContext2D",function(){return Q}),e.d(t,"__widl_f_stroke_rect_CanvasRenderingContext2D",function(){return X}),e.d(t,"__widl_f_fill_text_CanvasRenderingContext2D",function(){return en}),e.d(t,"__widl_f_set_font_CanvasRenderingContext2D",function(){return on}),e.d(t,"__widl_f_create_element_Document",function(){return sn}),e.d(t,"__widl_f_body_Document",function(){return _n}),e.d(t,"__widl_instanceof_HTMLCanvasElement",function(){return fn}),e.d(t,"__widl_f_get_context_HTMLCanvasElement",function(){return ln}),e.d(t,"__widl_f_width_HTMLCanvasElement",function(){return hn}),e.d(t,"__widl_f_set_width_HTMLCanvasElement",function(){return wn}),e.d(t,"__widl_f_height_HTMLCanvasElement",function(){return gn}),e.d(t,"__widl_f_set_height_HTMLCanvasElement",function(){return Cn}),e.d(t,"__widl_f_append_child_Node",function(){return xn}),e.d(t,"__widl_instanceof_Window",function(){return Dn}),e.d(t,"__widl_f_document_Window",function(){return En}),e.d(t,"__wbg_newnoargs_f3005d02efe69623",function(){return Rn}),e.d(t,"__wbg_call_10738551fb4d99e4",function(){return On}),e.d(t,"__wbindgen_object_clone_ref",function(){return Ln}),e.d(t,"__wbindgen_object_drop_ref",function(){return Hn}),e.d(t,"__wbindgen_string_new",function(){return Mn}),e.d(t,"__wbindgen_number_get",function(){return Sn}),e.d(t,"__wbindgen_is_null",function(){return jn}),e.d(t,"__wbindgen_is_undefined",function(){return An}),e.d(t,"__wbindgen_boolean_get",function(){return Kn}),e.d(t,"__wbindgen_is_symbol",function(){return Pn}),e.d(t,"__wbindgen_string_get",function(){return zn}),e.d(t,"__wbindgen_cb_forget",function(){return Fn}),e.d(t,"__wbindgen_closure_wrapper17",function(){return Nn}),e.d(t,"__wbindgen_throw",function(){return Un});var y=[],w=[{obj:void 0},{obj:null},{obj:!0},{obj:!1}];function v(n){return 1==(1&n)?y[n>>1]:w[n>>1].obj}var g=w.length;function b(n){g===w.length&&w.push(w.length+1);var t=g,e=w[t];return g=e,w[t]={obj:n,cnt:1},t<<1}function C(n){return b(new l(v(n)))}var m=l.prototype.start||function(){throw new Error("wasm-bindgen: GameLoop.prototype.start does not exist")};function x(n){return m.call(v(n))?1:0}function D(){return r.c()}function k(n){return v(n)instanceof CanvasRenderingContext2D?1:0}var E=CanvasRenderingContext2D.prototype.beginPath||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.beginPath does not exist")};function R(n){E.call(v(n))}var T=CanvasRenderingContext2D.prototype.fill||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.fill does not exist")};function O(n){T.call(v(n))}var L=CanvasRenderingContext2D.prototype.stroke||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.stroke does not exist")};function I(n){L.call(v(n))}function H(n,t){for(;n;){var e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=Object.getPrototypeOf(n)}throw new Error("descriptor for id='".concat(t,"' not found"))}var M=H(CanvasRenderingContext2D.prototype,"strokeStyle").set||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'strokeStyle').set does not exist")};function S(n,t){M.call(v(n),v(t))}var j=H(CanvasRenderingContext2D.prototype,"fillStyle").set||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle').set does not exist")};function A(n,t){j.call(v(n),v(t))}var K=CanvasRenderingContext2D.prototype.arc||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.arc does not exist")},P=null;function G(){return null!==P&&P.buffer===r.d.buffer||(P=new Uint32Array(r.d.buffer)),P}function z(n,t,e,r,o,i,a){try{K.call(v(n),t,e,r,o,i)}catch(n){var s=G();s[a/4]=1,s[a/4+1]=b(n)}}var F=CanvasRenderingContext2D.prototype.lineTo||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.lineTo does not exist")};function N(n,t,e){F.call(v(n),t,e)}var U=CanvasRenderingContext2D.prototype.moveTo||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.moveTo does not exist")};function q(n,t,e){U.call(v(n),t,e)}var W=CanvasRenderingContext2D.prototype.clearRect||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.clearRect does not exist")};function J(n,t,e,r,o){W.call(v(n),t,e,r,o)}var B=CanvasRenderingContext2D.prototype.fillRect||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.fillRect does not exist")};function Q(n,t,e,r,o){B.call(v(n),t,e,r,o)}var V=CanvasRenderingContext2D.prototype.strokeRect||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.strokeRect does not exist")};function X(n,t,e,r,o){V.call(v(n),t,e,r,o)}var Y=CanvasRenderingContext2D.prototype.fillText||function(){throw new Error("wasm-bindgen: CanvasRenderingContext2D.prototype.fillText does not exist")},Z=new("undefined"==typeof TextDecoder?e(11).TextDecoder:TextDecoder)("utf-8"),$=null;function nn(){return null!==$&&$.buffer===r.d.buffer||($=new Uint8Array(r.d.buffer)),$}function tn(n,t){return Z.decode(nn().subarray(n,n+t))}function en(n,t,e,r,o,i){var a=tn(t,e);try{Y.call(v(n),a,r,o)}catch(n){var s=G();s[i/4]=1,s[i/4+1]=b(n)}}var rn=H(CanvasRenderingContext2D.prototype,"font").set||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font').set does not exist")};function on(n,t,e){var r=tn(t,e);rn.call(v(n),r)}var an=Document.prototype.createElement||function(){throw new Error("wasm-bindgen: Document.prototype.createElement does not exist")};function sn(n,t,e,r){var o=tn(t,e);try{return b(an.call(v(n),o))}catch(n){var i=G();i[r/4]=1,i[r/4+1]=b(n)}}var un=H(Document.prototype,"body").get||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Document.prototype, 'body').get does not exist")};function cn(n){return void 0===n||null===n}function _n(n){var t=un.call(v(n));return cn(t)?0:b(t)}function fn(n){return v(n)instanceof HTMLCanvasElement?1:0}var dn=HTMLCanvasElement.prototype.getContext||function(){throw new Error("wasm-bindgen: HTMLCanvasElement.prototype.getContext does not exist")};function ln(n,t,e,r){var o=tn(t,e);try{var i=dn.call(v(n),o);return cn(i)?0:b(i)}catch(n){var a=G();a[r/4]=1,a[r/4+1]=b(n)}}var pn=H(HTMLCanvasElement.prototype,"width").get||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'width').get does not exist")};function hn(n){return pn.call(v(n))}var yn=H(HTMLCanvasElement.prototype,"width").set||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'width').set does not exist")};function wn(n,t){yn.call(v(n),t)}var vn=H(HTMLCanvasElement.prototype,"height").get||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'height').get does not exist")};function gn(n){return vn.call(v(n))}var bn=H(HTMLCanvasElement.prototype,"height").set||function(){throw new Error("wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'height').set does not exist")};function Cn(n,t){bn.call(v(n),t)}var mn=Node.prototype.appendChild||function(){throw new Error("wasm-bindgen: Node.prototype.appendChild does not exist")};function xn(n,t,e){try{return b(mn.call(v(n),v(t)))}catch(n){var r=G();r[e/4]=1,r[e/4+1]=b(n)}}function Dn(n){return v(n)instanceof Window?1:0}var kn=function(){return this.document};function En(n){var t=kn.call(v(n));return cn(t)?0:b(t)}function Rn(n,t){var e=tn(n,t);return b(new Function(e))}var Tn=Function.prototype.call||function(){throw new Error("wasm-bindgen: Function.prototype.call does not exist")};function On(n,t,e){try{return b(Tn.call(v(n),v(t)))}catch(n){var r=G();r[e/4]=1,r[e/4+1]=b(n)}}function Ln(n){return 1==(1&n)?b(v(n)):(w[n>>1].cnt+=1,n)}function In(n){if(!((n>>=1)<4)){var t=w[n];t.cnt-=1,t.cnt>0||(w[n]=g,g=n)}}function Hn(n){In(n)}function Mn(n,t){return b(tn(n,t))}function Sn(n,t){var e=v(n);return"number"==typeof e?e:(nn()[t]=1,0)}function jn(n){return null===v(n)?1:0}function An(n){return void 0===v(n)?1:0}function Kn(n){var t=v(n);return"boolean"==typeof t?t?1:0:2}function Pn(n){return"symbol"===h(v(n))?1:0}var Gn=new("undefined"==typeof TextEncoder?e(11).TextEncoder:TextEncoder)("utf-8");function zn(n,t){var e=v(n);if("string"!=typeof e)return 0;var o=p(function(n){var t=Gn.encode(n),e=r.b(t.length);return nn().set(t,e),[e,t.length]}(e),2),i=o[0],a=o[1];return G()[t/4]=a,i}var Fn=In;function Nn(n,t,e,o,i){var a=r.a.get(e),s=r.a.get(o),u=function(n){this.cnt++;var e=this.a;this.a=0;try{return a(e,t,n)}finally{this.a=e,1==this.cnt--&&s(this.a,t)}};u.a=n,u.cnt=1;var c=u.bind(u);return c.original=u,b(c)}function Un(n,t){throw new Error(tn(n,t))}},12:function(n,t,e){"use strict";var r=e.w[n.i];n.exports=r;e(10);r.e()}}]);