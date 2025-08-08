import { AxesHelper, Color, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry } from "three";
import { Camera } from "three";
import { Scene } from "three";
import { WebGLRenderer } from "three";
import { Group } from "three";
import { JS3Scene } from ".";
import { JS3Camera } from ".";
import { JS3WebGLRenderer } from ".";
import { JS3Node } from ".";
import { Text } from "../component/text";

export namespace JS3CoreLauncher {
    export type OnEnable = () => void;
    export type OnAnimationFrame = () => void;
    export type OnRender = (environment: Environment) => OnAnimationFrame;
    export type OnImageRender = (environment: Environment) => [OnAnimationFrame, Array<OnImage>];
    export type OnImage = (environment: Environment) => void;

    export type Environment = {
        webgl: WebGLRenderer,
        scene: Scene,
        camera: JS3Camera
    };

    export const enable_core: OnImage = ({ scene: s, camera: c }) => {
        s.position.set(0, 0, 0);
        s.add(c.child);
    };

    export const enable_zooming: OnImage = e => {

    };

    export const enable_panning: OnImage = e => {

    };

    export const enable_responsive_resize: OnImage = e => {

    };

    export function render_image(on_render: OnImageRender) {
        render(e => {
            const [on_animation_frame, images] = on_render(e);
            for (const image of images) {
                image(e);
            }
            return on_animation_frame;
        });
    }

    export function render(on_render: OnRender) {
        const win_w = window.innerWidth;
        const win_h = window.innerHeight;
        const s = JS3Scene.from_default();
        const c = JS3Camera.from();
        const webgl = JS3WebGLRenderer.from(s, c.child, win_w, win_h);
        document.body.appendChild(webgl.domElement);
        const on_animation_frame = on_render({ scene: s, camera: c, webgl });
        const on_animation_frame_begin = () => {
            requestAnimationFrame(on_animation_frame_begin);
            on_animation_frame();
            webgl.setSize(win_w, win_h);
            webgl.render(s, c.child);
        };
        on_animation_frame_begin();
    }
}