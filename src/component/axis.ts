import { Color } from "three";
import { Group } from "three";
import { Vector3 } from "three";
import { JS3Node } from "../js3";
import { Polygon } from "./polygon";
import { Text } from "./text";

export namespace Axis {
    
    export type Configuration = {
        w?: number,
        h?: number
    };

    export function from(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.w ??= 3000;
        cfg.h ??= 3000;
        const line_color = new Color(0x202020);
        const line_opacity = 0.1;
        const left_line = Polygon.from_buffer_geometry_and_basic_line_material({
            opacity: line_opacity,
            color: line_color,
            points: [
                new Vector3(0, 0),
                new Vector3(0, cfg.h)
            ]
        });
        const bottom_line = Polygon.from_buffer_geometry_and_basic_line_material({
            opacity: line_opacity,
            color: line_color,
            points: [
                new Vector3(0, 0),
                new Vector3(cfg.w, 0)
            ]
        });
        const left_label_pos_x_offset = 200;
        const left_line_top_pos_x = JS3Node.top_pos_x_of(left_line);
        const left_line_top_pos_y = JS3Node.top_pos_y_of(left_line);
        const left_label = Text.from(`${left_line_top_pos_x}m, ${left_line_top_pos_y}m`, {
            x: left_line_top_pos_x - left_label_pos_x_offset,
            y: left_line_top_pos_y,
            origin: "right"
        });
        const bottom_label_pos_y_offset = 100;
        const bottom_line_left_pos_x = JS3Node.center_left_pos_x_of(bottom_line);
        const bottom_line_left_pos_y = JS3Node.center_left_pos_y_of(bottom_line);
        const bottom_line_right_pos_x = JS3Node.center_right_pos_x_of(bottom_line);
        const bottom_line_right_pos_y = JS3Node.center_right_pos_y_of(bottom_line);
        const bottom_left_label = Text.from(`${bottom_line_left_pos_x}m, ${bottom_line_left_pos_y}m`, {
            x: bottom_line_left_pos_x,
            y: bottom_line_left_pos_y - bottom_label_pos_y_offset,
            origin: "left"
        });
        const bottom_right_label = Text.from(`${bottom_line_right_pos_x}m, ${bottom_line_right_pos_y}m`, {
            x: bottom_line_right_pos_x,
            y: bottom_line_right_pos_y - bottom_label_pos_y_offset,
            origin: "left"
        });
        return new Group()
            .add(left_line)
            .add(left_label)
            .add(bottom_line)
            .add(bottom_left_label)
            .add(bottom_right_label);
    }
}