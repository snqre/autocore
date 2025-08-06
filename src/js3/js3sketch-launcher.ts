import { WebGLRenderer } from "three";
import { Scene } from "three";
import { Camera } from "three";
import { Group } from "three";
import { BoxHelper } from "three";
import { JS3CoreLauncher } from ".";

export namespace JS3SketchLauncher {
    
    export type Context = {
        webgl: WebGLRenderer,
        scene: Scene,
        camera: Camera,
        canvas: Group
    };

    export type OnAnimationFrame = () => void;
    export type OnRender = (c: Context) => OnAnimationFrame;

    export function render(on_render: OnRender) {
        JS3CoreLauncher.render(c => {
            const g = new Group();
            const border = new BoxHelper(g, 0x202020);
            border.update();
            g.add(border);
            c.scene.add(g);
            return on_render({ ...c, canvas: g });
        });
    }
}