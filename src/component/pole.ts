import { Group } from "three";
import { Color } from "three";
import { Rect } from "./rect";

export namespace Pole {

    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number
    };

    export function from(configuration: Configuration): Group {
        const x = configuration.x ?? 0;
        const y = configuration.y ?? 0;
        const w = configuration.w ?? 3;
        const h = configuration.h ?? 100;
        return Rect.from_buffer_geometry_and_basic_line_material({
            x,
            y,
            w,
            h,
            color: new Color(0x009DDC)
        });
    }
}