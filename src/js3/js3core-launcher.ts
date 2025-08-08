import { GridHelper } from "three";
import { Scene } from "three";
import { Color } from "three";
import { WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { JS3Scene } from ".";
import { JS3Camera } from ".";
import { JS3WebGLRenderer } from ".";
import { require } from "../support";

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
        s.position.x = 0;
        s.position.y = 0;
        s.position.z = 0;
        s.add(c.child);
    };

    export const enable_grid: OnImage = ({ scene: s }) => {
        const grid_color_1 = new Color(0x202020);
        const grid = new GridHelper(5000, 50);
        grid.rotateX(90 * Math.PI / 180);
        grid.name = "hh";
        s.add(grid);
        require(false, "TODO");
    };

    export const enable_zoom: OnImage = ({ webgl: w, camera: c }) => {
        const controller = new OrbitControls(c.child, w.domElement);
        controller.enableZoom = true;
        controller.enablePan = true;
        controller.enableRotate = true;
        controller.update();
    };

    export const enable_responsive_resize: OnImage = ({ webgl: w, camera: c }) => {

        const resize = () => {
            const win_w = () => window.innerWidth;
            const win_h = () => window.innerHeight;
            c.child.aspect = win_w() / win_h();
            c.child.updateProjectionMatrix();
            w.setSize(win_w(), win_h());
        };

        window.addEventListener("resize", () => {
            resize();
        });

        resize();
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
        const win_w = () => window.innerWidth;
        const win_h = () => window.innerHeight;
        const s = JS3Scene.from_default();
        const c = JS3Camera.from();
        const webgl = JS3WebGLRenderer.from(s, c.child, win_w(), win_h());
        document.body.appendChild(webgl.domElement);
        const on_animation_frame = on_render({ scene: s, camera: c, webgl });
        const on_animation_frame_begin = () => {
            requestAnimationFrame(on_animation_frame_begin);
            on_animation_frame();
            webgl.setSize(win_w(), win_h());
            webgl.render(s, c.child);
        };
        on_animation_frame_begin();
    }
}