import { BufferGeometry } from "three";
import { Color } from "three";
import { Group } from "three";
import { Line } from "three";
import { LineBasicMaterial } from "three";
import { Vector3 } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { ShapeGeometry } from "three";
import { Shape } from "three";
import { Static } from "../static";
import { assert } from "../support";

export namespace Polygon {

    export type Configuration = {
        points: Array<Vector3>,
        x?: number,
        y?: number,
        color?: Color
    };

    export function from_shape_geometry_and_basic_mesh_material(configuration: Configuration): Group {
        const points = configuration.points;
        const x = configuration.x ?? Static.DEFAULT_X;
        const y = configuration.y ?? Static.DEFAULT_Y;
        const color = configuration.color ?? Static.DEFAULT_COLOR;
        const shape = new Shape();
        const first = points.at(0);
        assert(first !== undefined);
        const first_x = first.x;
        const first_y = first.y;
        shape.moveTo(first_x, first_y);
        for (let i = 1; i < points.length; i++) {
            const point = points.at(i);
            assert(point !== undefined);
            const point_x = point.x;
            const point_y = point.y;
            shape.lineTo(point_x, point_y);
        }
        const geometry = new ShapeGeometry(shape);
        const material = new MeshBasicMaterial({
            color,
            side: 2
        });
        const mesh = new Mesh(geometry, material);
        const g = new Group();
        g.position.x = x;
        g.position.y = y;
        return g.add(mesh);
    }

    export function from_buffer_geometry_and_basic_line_material(configuration: Configuration): Group {
        const points = configuration.points;
        const x = configuration.x ?? Static.DEFAULT_X;
        const y = configuration.y ?? Static.DEFAULT_Y;
        const color = configuration.color ?? Static.DEFAULT_COLOR;
        const first = points.at(0);
        assert(first !== undefined);
        const last = points.at(points.length - 1);
        assert(last !== undefined);
        if (!first.equals(last)) {
            const first_clone = first.clone();
            points.push(first_clone);
        }
        const material = new LineBasicMaterial({
            color
        });
        const geometry = new BufferGeometry().setFromPoints(points);
        const g = new Group();
        g.position.x = x;
        g.position.y = y;
        const line = new Line(geometry, material);
        return g.add(line);
    }
}