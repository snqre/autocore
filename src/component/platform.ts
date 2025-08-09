import { Group } from "three";
import { LineBasicMaterial } from "three";
import { Color } from "three";
import { BufferGeometry } from "three";
import { Vector3 } from "three";
import { Line } from "three";
import { ZigZagLine } from ".";

export namespace Platform {

    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        color?: Color
    };

    export function from(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.w ??= 100;
        cfg.h ??= 100;
        cfg.color ??= new Color("red");
        const color = cfg.color;
        const material = new LineBasicMaterial({ color });
        const surface_line_geometry = new BufferGeometry().setFromPoints([
            new Vector3(0, 0),
            new Vector3(cfg.w, 0)
        ]);
        const surface_line = new Line(surface_line_geometry, material);
        const under_line_geometry = new BufferGeometry().setFromPoints([
            new Vector3(0, cfg.h),
            new Vector3(cfg.w, cfg.h)
        ]);
        const under_line = new Line(under_line_geometry, material);
        const filler_pattern = ZigZagLine.from_buffer_geometry_and_basic_line_material({
            x: 0,
            y: cfg.h / 2,
            length: cfg.w,
            amplitude: cfg.h / 2,
            segments: cfg.w / 10,
            color
        });
        const g = new Group();
        g.add(surface_line);
        g.add(under_line)
        g.add(filler_pattern);
        g.position.x = cfg.x;
        g.position.y = cfg.y;
        return g;
    }
}