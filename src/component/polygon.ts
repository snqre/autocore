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
import { require } from "../support";

export namespace Polygon {
    
    export type Configuration = {
        points: Array<Vector3>,
        x?: number,
        y?: number,
        color?: Color
    };

    export function from_shape_geometry_and_basic_mesh_material(cfg: Configuration): Group {
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.color ??= new Color(0x202020);
        const shape = new Shape();
        const first = cfg.points.at(0);
        require(!!first);
        shape.moveTo(first.x, first.y);
        for (let i = 1; i < cfg.points.length; i++) {
            const point = cfg.points.at(i);
            require(!!point);
            shape.lineTo(point.x, point.y);
        }
        const color = cfg.color;
        const geometry = new ShapeGeometry(shape);
        const material = new MeshBasicMaterial({ color, side: 2 });
        const mesh = new Mesh(geometry, material);
        const g = new Group();
        g.position.x = cfg.x;
        g.position.y = cfg.y;
        return g.add(mesh);
    }

    export function from_buffer_geometry_and_basic_line_material(cfg: Configuration): Group {
        const points = cfg.points;
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.color ??= new Color(0x202020);
        const first = points.at(0);
        require(!!first);
        const last = points.at(points.length - 1);
        require(!!last);
        if (!first.equals(last)) {
            const first_clone = first.clone();
            points.push(first_clone);
        }
        const color = cfg.color;
        const material = new LineBasicMaterial({ color });
        const geometry = new BufferGeometry().setFromPoints(points);
        const line = new Line(geometry, material);
        const g = new Group();
        g.position.x = cfg.x;
        g.position.y = cfg.y;
        return g.add(line);
    }
}