import { Vector3 } from "three";
import { Group } from "three";
import { Color } from "three";
import { Static } from "../static";
import { Polygon } from "./polygon";

export namespace Rect {

    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        color?: Color
    };

    export function from_shape_geometry_and_basic_mesh_material(configuration: Configuration): Group {
        const w = configuration.w ?? Static.DEFAULT_W;
        const h = configuration.h ?? Static.DEFAULT_H;
        return Polygon.from_shape_geometry_and_basic_mesh_material({
            x: configuration.x ?? Static.DEFAULT_X,
            y: configuration.x ?? Static.DEFAULT_Y,
            color: configuration.color ?? Static.DEFAULT_COLOR,
            points: [
                new Vector3(0, 0),
                new Vector3(w, 0),
                new Vector3(w, h),
                new Vector3(0, h),
                new Vector3(0, 0)
            ]
        });
    }

    export function from_buffer_geometry_and_basic_line_material(configuration: Configuration): Group {
        const w = configuration.w ?? Static.DEFAULT_W;
        const h = configuration.h ?? Static.DEFAULT_H;
        const rect_outline = Polygon.from_buffer_geometry_and_basic_line_material({
            x: configuration.x ?? Static.DEFAULT_X,
            y: configuration.y ?? Static.DEFAULT_Y,
            color: configuration.color ?? Static.DEFAULT_COLOR,
            points: [
                new Vector3(0, 0),
                new Vector3(w, 0),
                new Vector3(w, h),
                new Vector3(0, h),
                new Vector3(0, 0)
            ]
        });
        return new Group().add(rect_outline);
    }
}