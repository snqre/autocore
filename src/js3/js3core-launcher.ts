import { Scene } from "three";
import { Camera } from "three";
import { WebGLRenderer } from "three";
import { JS3Win } from ".";
import { JS3Scene } from ".";
import { JS3Camera } from ".";
import { JS3WebGLRenderer } from ".";

export namespace JS3CoreLauncher {
    
    export type Context = {
        webgl: WebGLRenderer,
        scene: Scene,
        camera: Camera
    };

    export type OnAnimationFrame = () => void;
    export type OnRender = (c: Context) => OnAnimationFrame;
    
    export function render(on_render: OnRender) {
        const win_w = JS3Win.w();
        const win_h = JS3Win.h();
        const s = JS3Scene.from_default();
        const c = JS3Camera.from_orthographic_projection(win_w, win_h);
        const webgl = JS3WebGLRenderer.from(s, c, win_w, win_h);

        // @ts-ignore
        document.body.appendChild(webgl.domElement);

        const on_animation_frame = on_render({ webgl, scene: s, camera: c });
        const on_animation_frame_begin = () => {
            // @ts-ignore
            requestAnimationFrame(on_animation_frame_begin);

            on_animation_frame();
            webgl.render(s, c);
        };

        on_animation_frame_begin();
    }
}