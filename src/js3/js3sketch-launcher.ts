import { Option } from "ts-results-es";
import { None } from "ts-results-es";
import { WebGLRenderer } from "three";
import { Scene } from "three";
import { Camera } from "three";
import { Group } from "three";
import { BoxHelper } from "three";
import { JS3CoreLauncher } from ".";

export namespace JS3SketchLauncher {
    export type Node = {
        webgl: WebGLRenderer,
        scene: Scene,
        camera: Camera,
        canvas: Group
    };

    export type OnAnimationFrame = () => void;
    export type OnAsyncRender = (node: Node) => Promise<Option<OnAnimationFrame>>;
    export type OnRender = (node: Node) => Option<OnAnimationFrame>;

    export function renderAsync(onAsyncRender: OnAsyncRender): Promise<Option<void>> {
        return JS3CoreLauncher.renderAsync(async node => {
            try {
                const g = new Group();
                const border = new BoxHelper(g, 0x202020);
                border.update();
                g.add(border);
                node.scene.add(g);
                return onAsyncRender({ ...node, canvas: g })
            } catch {
                return None;
            }
        });
    }

    export function render(onRender: OnRender): Option<void> {
        return JS3CoreLauncher.render(node => {
            try {
                const g = new Group();
                const border = new BoxHelper(g, 0x202020);
                border.update();
                g.add(border);
                node.scene.add(g);
                return onRender({ ...node, canvas: g });
            } catch (e) {
                return None;
            }
        });
    }
}