import { OrthographicCamera } from "three";

export namespace JS3Camera {
    
    export function from_orthographic_projection(win_w: number, win_h: number): OrthographicCamera {
        const c = new OrthographicCamera(
            0, win_w,
            0, win_h,
            0.1, 
            1000
        );
        c.far = 1000;
        c.position.set(0, 0, 10);
        c.lookAt(0, 0, 0);
        return c;
    }
}