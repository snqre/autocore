import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Camera } from "three";
import { Scene } from "three";
import { WebGLRenderer } from "three";

export namespace JS3WebGLRenderer {
    export function from(scene: Scene, camera: Camera, windowWidth: number, windowHeight: number): Option<WebGLRenderer> {
        try {
            const webgl = new WebGLRenderer();
            webgl.setSize(windowWidth, windowHeight);
            webgl.render(scene, camera);
            return Some(webgl);
        } catch {
            return None;
        }
    }
}