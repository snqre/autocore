import { Color, Vector3 } from "three";
import { Group } from "three";
import { Polygon } from "./polygon";

export namespace Underlift {

    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        size?: number,
        color?: Color
    };

    export function from(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.w ??= 100;
        cfg.h ??= 50;
        cfg.size ??= 5;
        cfg.color ??= new Color(0x202020);
        const x = (n: number) => (cfg.w! / 4) * n;
        const y = (n: number) => (cfg.h! / 2) * n;
        return Polygon.from_shape_geometry_and_basic_mesh_material({
            x: cfg.x,
            y: cfg.y,
            color: cfg.color,
            points: [
                new Vector3(x(0), y(0)),
                new Vector3(x(1), y(1)),
                new Vector3(x(2), y(1)),
                new Vector3(x(3), y(0)),
                new Vector3(x(3), y(0) - cfg.size),
                new Vector3(x(2), y(1) - cfg.size),
                new Vector3(x(1), y(1) - cfg.size),
                new Vector3(x(0), y(0) - cfg.size)
            ]
        });
    }
}