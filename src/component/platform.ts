import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Group } from "three";
import { LineBasicMaterial } from "three";
import { Color } from "three";
import { BufferGeometry } from "three";
import { Vector3 } from "three";
import { Line } from "three";
import { ZigZagLine } from ".";

export namespace Platform {
    export type Configuration = {
        w?: number,
        h?: number,
        color?: Color
    };

    export function from(configuration?: Configuration): Option<Group> {
        try {
            const w = configuration?.w ?? 100;
            const h = configuration?.h ?? 10;
            const color = configuration?.color ?? new Color(0x202020);
            const material = new LineBasicMaterial({ color });
            const topLineGeometry = new BufferGeometry().setFromPoints([
                new Vector3(0, 0),
                new Vector3(w, 0)
            ]);
            const topLine = new Line(topLineGeometry, material);
            const bottomLineGeometry = new BufferGeometry().setFromPoints([
                new Vector3(0, h),
                new Vector3(w, h)
            ]);
            const bottomLine = new Line(bottomLineGeometry, material);
            const fillerPatternO = ZigZagLine.from_buffer_geometry_and_basic_line_material({
                x: 0,
                y: h / 2,
                length: w,
                amplitude: h / 2,
                segments: w / 2,
                color
            });
            if (fillerPatternO.isNone()) {
                return None;
            }
            const fillerPattern = fillerPatternO.safeUnwrap();
            const group = new Group();
            group.add(topLine);
            group.add(bottomLine);
            group.add(fillerPattern);
            return Some(group);
        } catch {
            return None;
        }
    }
}