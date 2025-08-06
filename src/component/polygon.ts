import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
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

export namespace Polygon {
    export type Configuration = {
        points: Array<Vector3>,
        x?: number,
        y?: number,
        color?: Color
    };

    export function fromShapeGeometryAndBasicMeshMaterial(configuration: Configuration): Option<Group> {
        try {
            const points = configuration.points;
            const x = configuration.x ?? 0;
            const y = configuration.y ?? 0;
            const color = configuration.color ?? new Color(0x202020);
            const shape = new Shape();
            const first = points.at(0);
            if (first === undefined) {
                return None;
            }
            const first_x = first.x;
            const first_y = first.y;
            shape.moveTo(first_x, first_y);
            for (let i = 1; i < points.length; i++) {
                const point = points.at(i);
                if (point === undefined) {
                    return None;
                }
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
            const group = new Group();
            group.position.x = x;
            group.position.y = y;
            group.add(mesh);
            return Some(group);
        } catch {
            return None;
        }
    }

    export function fromBufferGeometryAndBasicLineMaterial(configuration: Configuration): Option<Group> {
        try {
            const points = configuration.points;
            const x = configuration.x ?? 0;
            const y = configuration.y ?? 0;
            const color = configuration.color ?? new Color(0x202020);
            const first = points.at(0);
            if (first === undefined) {
                return None;
            }
            const last = points.at(points.length - 1);
            if (last === undefined) {
                return None;
            }
            if (!first.equals(last)) {
                const first_clone = first.clone();
                points.push(first_clone);
            }
            const material = new LineBasicMaterial({
                color
            });
            const geometry = new BufferGeometry().setFromPoints(points);
            const line = new Line(geometry, material);
            const group = new Group();
            group.position.x = x;
            group.position.y = y;
            group.add(line);
            return Some(group);
        } catch {
            return None;
        }
    }
}