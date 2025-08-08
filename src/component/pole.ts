import { Group, Vector3 } from "three";
import { Color } from "three";
import { Rect } from "./rect";
import { Polygon } from "./polygon";

export namespace Pole {
    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        base_foundation_w?: number,
        base_foundation_h?: number,
        base_w?: number,
        base_h?: number,
    };

    export function from(cfg?: Configuration): Group {
        cfg = {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.w ??= 25;
        cfg.h ??= 2000;
        cfg.base_w ??= 75;
        cfg.base_h ??= 10;
        cfg.base_foundation_w ??= 10;
        cfg.base_foundation_h ??= 75;
        const base = Polygon.from_shape_geometry_and_basic_mesh_material({
            points: [
                new Vector3(0, 0),
                new Vector3(0, cfg.base_h),
                new Vector3(cfg.base_w, cfg.base_h),
                new Vector3(cfg.base_w, 0)
            ],
            color: new Color("red")
        });
        const base_foundation = Rect.from_shape_geometry_and_basic_mesh_material({
            x: (cfg.base_w / 2) - (cfg.base_foundation_w / 2),
            y: cfg.base_h,
            w: cfg.base_foundation_w,
            h: cfg.base_foundation_h,
            color: new Color("blue")
        });
        const pole = Rect.from_buffer_geometry_and_basic_line_material({
            x: (cfg.base_w / 2) - (cfg.w / 2),
            y: cfg.base_h + cfg.base_foundation_h,
            w: cfg.w,
            h: cfg.h,
            color: new Color("blue")
        });
        const g = new Group();
        g.add(base);
        g.add(base_foundation);
        g.add(pole);
        return g;
    }
}