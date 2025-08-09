import { Group } from "three";
import { Vector3 } from "three";
import { JS3Node } from "../js3";
import { Polygon } from "./polygon";
import { Text } from "./text";

export namespace Floor {
    
    export type Configuration = {
        y?: number
    };

    export function from(configuration: Configuration): Option<Group> {
        const windowWidth = window.innerWidth;
        const y = configuration.y ?? 0;
        const lineO = Polygon.from_buffer_geometry_and_basic_line_material({
            points: [
                new Vector3(0, y),
                new Vector3(windowWidth, y)
            ]
        });
        if (lineO.isNone()) {
            return None;
        }
        const line = lineO.safeUnwrap();
        const coordinateAR = Text.from(`(0m, ${y}m)`, {
            origin: "left",
            size: 50
        });
        if (coordinateAR.isErr()) {
            return None;
        }
        const coordinateA = coordinateAR.safeUnwrap();
        coordinateA.position.x = JS3Node.bottom_left_pos_x_of(line);
        coordinateA.position.y = JS3Node.bottom_left_pos_y_of(line) + 25;
        const coordinateBR = Text.from(`(${windowWidth}m, ${y}m)`, {
            origin: "right",
            size: 50
        });
        if (coordinateBR.isErr()) {
            return None;
        }
        const coordinateB = coordinateBR.safeUnwrap();
        coordinateB.position.x = windowWidth;
        coordinateB.position.y = y + 25;
        const group = new Group();
        group.add(line);
        group.add(coordinateA);
        group.add(coordinateB);
        return Some(group);
    }
}