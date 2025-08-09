import { Color, Vector3 } from "three";
import { Polygon } from ".";

export namespace Circle {

    export type Configuration = {
        x?: number,
        y?: number,
        radius?: number,
        reso?: number,
        color?: Color,
        opacity?: number
    };

    export function from(cfg?: Configuration) {
        cfg ??= {};
        cfg.radius ??= 10;
        cfg.reso ??= 32;
        return Polygon.from_buffer_geometry_and_basic_line_material({
            x: cfg.x,
            y: cfg.y,
            opacity: cfg.opacity,
            color: cfg.color,
            points: (() => {
                const points: Array<Vector3> = [];
                for (let i = 0; i < cfg.reso; i++) {
                    const angle = (i / cfg.reso) * Math.PI * 2;
                    const x = Math.cos(angle) * cfg.radius;
                    const y = Math.sin(angle) * cfg.radius;
                    points.push(new Vector3(x, y));
                }
                points.push(points[0]!.clone());
                return points
            })()
        });
    }
}