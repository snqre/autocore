import { OrthographicCamera } from "three";
import { require } from "../support";

export namespace JS3Camera {

    export function from_orthographic_projection(
        w: number, 
        h: number,
        min_distance?: number,
        max_distance?: number): OrthographicCamera {
        require(w >= 0);
        require(h >= 0);
        require(Number.isFinite(w));
        require(Number.isFinite(h));
        if (min_distance) {
            require(min_distance >= 0);
        }
        if (max_distance) {
            require(max_distance >= 0);
        }
        if (min_distance && max_distance) {
            require(min_distance < max_distance);
        }
        const c = new OrthographicCamera(
            0, w,
            0, h,
            min_distance ?? 0.1, 
            max_distance ?? 1000
        );
        c.far = 1000;
        c.position.set(0, 0, 10);
        c.lookAt(0, 0, 0);
        return c;
    }
}