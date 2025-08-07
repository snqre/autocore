import { Scene } from "three";
import { Color } from "three";

export namespace JS3Scene {
    
    export function from_default(): Scene {
        const scene = new Scene();
        scene.background = new Color(0xffffff);
        return scene;
    }
}