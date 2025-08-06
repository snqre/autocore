import { Group } from "three";
import { LineBasicMaterial } from "three";
import { Color } from "three";
import { BufferGeometry } from "three";
import { Vector3 } from "three";
import { Line } from "three";
import { ZigZagLine } from "./zig-zag-line";

export namespace Platform {

    export type Configuration = {
        w?: number,
        h?: number
    };

    export function from(configuration: Configuration): Group {
        const c = configuration;
        c.w ??= 100;
        c.h ??= 5;
        const material = new LineBasicMaterial({
            color: new Color("#F26430")
        });
        const top_line_geometry = new BufferGeometry().setFromPoints([
            new Vector3(0, 0),
            new Vector3(c.w, 0)
        ]);
        const top_line = new Line(top_line_geometry, material);
        const bottom_line_geometry = new BufferGeometry().setFromPoints([
            new Vector3(0, c.h),
            new Vector3(c.w, c.h)
        ]);
        const bottom_line = new Line(bottom_line_geometry, material);
        const g = new Group();
        g.add(top_line);
        g.add(bottom_line);
        g.add(ZigZagLine.fromBufferGeometryAndBasicLineMaterial({
            x: 0,
            y: c.h / 2,
            length: c.w,
            amplitude: c.h / 2,
            segments: c.w / 2,
            color: new Color("#F26430")
        }));
        return g;
    }
}