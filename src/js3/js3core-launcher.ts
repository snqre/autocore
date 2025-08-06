import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Scene } from "three";
import { Camera } from "three";
import { WebGLRenderer } from "three";
import { JS3Scene } from ".";
import { JS3Camera } from ".";
import { JS3WebGLRenderer } from ".";

export namespace JS3CoreLauncher {
    export type Node = {
        webgl: WebGLRenderer,
        scene: Scene,
        camera: Camera
    };

    export type OnAnimationFrame = () => void;
    export type OnRender = (node: Node) => Option<OnAnimationFrame>;
    export type OnAsyncRender = (node: Node) => Promise<Option<OnAnimationFrame>>;
    
    export function renderAsync(onAsyncRender: OnAsyncRender): Promise<Option<void>> {
        return new Promise(async ok => {
            try {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const sceneO = JS3Scene.fromDefault();
                if (sceneO.isNone()) {
                    return ok(None);
                }
                const scene = sceneO.safeUnwrap();
                const cameraO = JS3Camera.fromOrthographicProjection(windowWidth, windowHeight);
                if (cameraO.isNone()) {
                    return ok(None);
                }
                const camera = cameraO.safeUnwrap();
                const webglO = JS3WebGLRenderer.from(scene, camera, windowWidth, windowHeight);
                if (webglO.isNone()) {
                    return ok(None);
                }
                const webgl = webglO.safeUnwrap();
                document.body.appendChild(webgl.domElement);
                const onAnimationFrameO = await onAsyncRender({ webgl, scene, camera });
                if (onAnimationFrameO.isNone()) {
                    return ok(None);
                }
                const onAnimationFrame = onAnimationFrameO.safeUnwrap();
                const onAnimationFrameBegin = () => {
                    requestAnimationFrame(onAnimationFrameBegin);
                    onAnimationFrame();
                    webgl.render(scene, camera);
                };
                onAnimationFrameBegin();
                return ok(Some(undefined));
            } catch {
                return ok(None);
            }
        });
    }

    export function render(onRender: OnRender): Option<void> {
        try {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const sceneO = JS3Scene.fromDefault();
            if (sceneO.isNone()) {
                return None;
            }
            const scene = sceneO.safeUnwrap();
            const cameraO = JS3Camera.fromOrthographicProjection(windowWidth, windowHeight);
            if (cameraO.isNone()) {
                return None;
            }
            const camera = cameraO.safeUnwrap();
            const webglO = JS3WebGLRenderer.from(scene, camera, windowWidth, windowHeight);
            if (webglO.isNone()) {
                return None;
            }
            const webgl = webglO.safeUnwrap();
            document.body.appendChild(webgl.domElement);
            const onAnimationFrameO = onRender({ webgl, scene, camera });
            if (onAnimationFrameO.isNone()) {
                return None;
            }
            const onAnimationFrame = onAnimationFrameO.safeUnwrap();
            const onAnimationFrameBegin = () => {
                requestAnimationFrame(onAnimationFrameBegin);
                onAnimationFrame();
                webgl.render(scene, camera);
            };
            onAnimationFrameBegin();
            return Some(undefined);
        } catch {
            return None;
        }
    }
}