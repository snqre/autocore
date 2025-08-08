import { PerspectiveCamera } from "three";
import { require } from "../support";

export type JS3Camera = {
    child: PerspectiveCamera,
    min_distance(): number,
    max_distance(): number,
    set_fov(n: number): void,
    set_pos_z(n: number): void
};

export namespace JS3Camera {

    export function from(min_distance?: number, max_distance?: number): JS3Camera {
        min_distance ??= 1;
        max_distance ??= 2500;
        require(max_distance >= 0);
        require(min_distance >= 0);
        require(min_distance < max_distance);
        const child = new PerspectiveCamera(100, 1, min_distance, max_distance);
        const m_max_distance = () => child.far;
        const m_min_distance = () => child.near;

        const m_set_fov = (n: number) => {
            require(Number.isFinite(n));
            require(n >= Number.MIN_SAFE_INTEGER);
            require(n <= Number.MAX_SAFE_INTEGER);
            require(n > 0);
            require(n < 100);
            child.fov = n;
            child.updateProjectionMatrix();
        };

        const m_set_pos_z = (n: number) => {
            require(Number.isFinite(n));
            require(n >= Number.MIN_SAFE_INTEGER);
            require(n <= Number.MAX_SAFE_INTEGER);
            require(n >= min_distance);
            require(n <= max_distance);
            child.position.z = n;
            child.updateProjectionMatrix();
        };

        const update_pos_z = () => child.position.z = m_max_distance() / 2;
        const update_aspect = () => {
            const win_w = window.innerWidth;
            const win_h = window.innerHeight;
            require(win_w >= 0);
            require(win_h >= 0);
            require(Number.isFinite(win_w));
            require(Number.isFinite(win_h));
            require(win_w >= Number.MIN_SAFE_INTEGER);
            require(win_h >= Number.MIN_SAFE_INTEGER);
            require(win_w <= Number.MAX_SAFE_INTEGER);
            require(win_h <= Number.MAX_SAFE_INTEGER);
            const aspect = win_w / win_h;
            child.aspect = aspect;
            child.updateProjectionMatrix();
        };

        window.addEventListener("resize", () => {
            update_aspect();
        });

        update_aspect();
        update_pos_z();
        return {
            child,
            min_distance: m_min_distance,
            max_distance: m_max_distance,
            set_fov: m_set_fov,
            set_pos_z: m_set_pos_z
        };
    }
}