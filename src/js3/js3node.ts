import { Box3 } from "three";
import { BoxHelper } from "three";
import { Group } from "three";
import { Mesh } from "three";
import { Line } from "three";
import { Vector3 } from "three";
import { Color } from "three";

export type JS3Node = 
    | Group 
    | Mesh 
    | Line 
    | BoxHelper;

export namespace JS3Node {

    export function as_debug_bounding_box_for(child: JS3Node, color?: Color): JS3Node {
        return new BoxHelper(child, color).add(child);
    }


    export function size_of(child: JS3Node): Vector3 {
        return bounding_box_of(child).getSize(new Vector3());
    }

    export function w_of(child: JS3Node): number {
        const b = bounding_box_of(child);
        const max_x = b.max.x;
        const min_x = b.min.x;
        return max_x - min_x;
    }

    export function h_of(child: JS3Node): number {
        const b = bounding_box_of(child);
        const max_y = b.max.y;
        const min_y = b.min.y;
        return max_y - min_y;
    }

    export function depth_of(child: JS3Node): number {
        const b = bounding_box_of(child);
        const max_z = b.max.z;
        const min_z = b.min.z;
        return max_z - min_z;
    }


    export function position_of(child: JS3Node): Vector3 {
        const x = child.position.x;
        const y = child.position.y;
        const z = child.position.z;
        return new Vector3(x, y, z);
    }

    export function position_x(child: JS3Node): number {
        return position_of(child).x;
    }

    export function position_y(child: JS3Node): number {
        return position_of(child).y;
    }


    // ! * *
    // * * *
    // * * *

    export function top_left_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const x = b.min.x;
        const y = b.max.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function top_left_pos_x_of(child: JS3Node): number {
        return top_left_pos_of(child).x;
    }

    export function top_left_pos_y_of(child: JS3Node): number {
        return top_left_pos_of(child).y;
    }


    // * ! *
    // * * *
    // * * *

    export function top_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const min_x = b.min.x;
        const max_x = b.max.x;
        const x = (min_x + max_x) / 2;
        const y = b.max.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function top_pos_x_of(child: JS3Node): number {
        return top_pos_of(child).x;
    }

    export function top_pos_y_of(child: JS3Node): number {
        return top_pos_of(child).y;
    }


    // * * !
    // * * *
    // * * *

    export function top_right_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const x = b.max.x;
        const y = b.max.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function top_right_pos_x_of(child: JS3Node): number {
        return top_right_pos_of(child).x;
    }

    export function top_right_pos_y_of(child: JS3Node): number {
        return top_right_pos_of(child).y;
    }


    // * * *
    // ! * *
    // * * *

    export function center_left_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const min_y = b.min.y;
        const max_y = b.max.y;
        const x = b.min.x;
        const y = (min_y + max_y) / 2;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function center_left_pos_x_of(child: JS3Node): number {
        return center_left_pos_of(child).x;
    }

    export function center_left_pos_y_of(child: JS3Node): number {
        return center_left_pos_of(child).y;
    }


    // * * *
    // * ! *
    // * * *

    export function center_pos_of(child: JS3Node): Vector3 {
        return bounding_box_of(child).getCenter(new Vector3());
    }

    export function center_pos_x_of(child: JS3Node): number {
        return center_pos_of(child).x;
    }

    export function center_pos_y_of(child: JS3Node): number {
        return center_pos_of(child).y;
    }


    // * * *
    // * * !
    // * * *

    export function center_right_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const min_y = b.min.y;
        const max_y = b.max.y;
        const x = b.max.x;
        const y = (min_y + max_y) / 2;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function center_right_pos_x_of(child: JS3Node): number {
        return center_right_pos_of(child).x;
    }

    export function center_right_pos_y_of(child: JS3Node): number {
        return center_right_pos_of(child).y;
    }


    // * * *
    // * * *
    // ! * *

    export function bottom_left_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const x = b.min.x;
        const y = b.min.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function bottom_left_pos_x_of(child: JS3Node): number {
        return bottom_left_pos_of(child).x;
    }

    export function bottom_left_pos_y_of(child: JS3Node): number {
        return bottom_left_pos_of(child).y;
    }


    // * * *
    // * * *
    // * ! * 

    export function bottom_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const min_x = b.min.x;
        const max_x = b.max.x;
        const x = (min_x + max_x) / 2;
        const y = b.min.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function bottom_pos_x_of(child: JS3Node): number {
        return bottom_pos_of(child).x;
    }

    export function bottom_pos_y_of(child: JS3Node): number {
        return bottom_pos_of(child).y;
    }


    // * * *
    // * * *
    // * * !

    export function bottom_right_pos_of(child: JS3Node): Vector3 {
        const b = bounding_box_of(child);
        const x = b.max.x;
        const y = b.min.y;
        const z = b.min.z;
        return new Vector3(x, y, z);
    }

    export function bottom_right_pos_x_of(child: JS3Node): number {
        return bottom_right_pos_of(child).x;
    }

    export function bottom_right_pos_y_of(child: JS3Node): number {
        return bottom_right_pos_of(child).y;
    }


    export function bounding_box_of(item: JS3Node): Box3 {
        return new Box3().setFromObject(item);
    }
}