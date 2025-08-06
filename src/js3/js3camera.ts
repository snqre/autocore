import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { OrthographicCamera } from "three";

export namespace JS3Camera {
    export function fromOrthographicProjection(width: number, height: number): Option<OrthographicCamera> {
        try {
            const camera = new OrthographicCamera(
                0, width,
                0, height,
                0.1, 
                1000
            );
            camera.far = 1000;
            camera.position.set(0, 0, 10);
            camera.lookAt(0, 0, 0);
            return Some(camera);
        } catch {
            return None;
        }
    }
}