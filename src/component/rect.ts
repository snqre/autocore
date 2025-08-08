import { Vector3 } from "three";
import { Group } from "three";
import { Color } from "three";
import { Polygon } from "./polygon";

export namespace Rect {
    
    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        color?: Color
    };

    export function from_shape_geometry_and_basic_mesh_material(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.w ??= 100;
        cfg.h ??= 100;
        cfg.color ??= new Color(0x202020);
        return Polygon.from_shape_geometry_and_basic_mesh_material({
            x: cfg.x,
            y: cfg.y,
            color: cfg.color,
            points: [
                new Vector3(0, 0),
                new Vector3(cfg.w, 0),
                new Vector3(cfg.w, cfg.h),
                new Vector3(0, cfg.h),
                new Vector3(0, 0)
            ]
        });
    }

    export function from_buffer_geometry_and_basic_line_material(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.w ??= 100;
        cfg.h ??= 100;
        cfg.color ??= new Color(0x202020);
        return Polygon.from_buffer_geometry_and_basic_line_material({
            x: cfg.x,
            y: cfg.y,
            color: cfg.color,
            points: [
                new Vector3(0, 0),
                new Vector3(cfg.w, 0),
                new Vector3(cfg.w, cfg.h),
                new Vector3(0, cfg.h),
                new Vector3(0, 0)
            ]
        });
    }
}