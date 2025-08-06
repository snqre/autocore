import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Scene } from "three";
import { Color } from "three";

export namespace JS3Scene {
    export function fromDefault(): Option<Scene> {
        try {
            const scene = new Scene();
            scene.background = new Color(0xffffff);
            return Some(scene);
        } catch {
            return None;
        }
    }
}