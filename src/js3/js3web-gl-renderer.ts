import { Camera } from "three";
import { Scene } from "three";
import { WebGLRenderer } from "three";

export namespace JS3WebGLRenderer {
    
    export function from(scene: Scene, camera: Camera, win_w: number, win_h: number): WebGLRenderer {
        const webgl = new WebGLRenderer({
            antialias: true
        });
        webgl.setSize(win_w, win_h);
        webgl.render(scene, camera);
        return webgl;
    }
}