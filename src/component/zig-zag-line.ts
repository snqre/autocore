import { BufferGeometry } from "three";
import { Color } from "three";
import { Line } from "three";
import { LineBasicMaterial } from "three";
import { Vector3 } from "three";

export namespace ZigZagLine {

    export type Configuration = {
        x?: number,
        y?: number,
        angle?: number,
        length?: number,
        amplitude?: number,
        segments?: number,
        color?: Color
    };

    export function from_buffer_geometry_and_basic_line_material(configuration: Configuration): Line {
        const c = configuration;
        c.x ??= 0;
        c.y ??= 0;
        c.angle ??= 0;
        c.length ??= 100;
        c.amplitude ??= 5;
        c.segments ??= 8;
        c.color ??= new Color(0x202020);
        const angle_rad = c.angle * Math.PI / 180;
        const first_point = new Vector3(c.x, c.y);
        const last_point = new Vector3(
            c.x + c.length * Math.cos(angle_rad),
            c.y + c.length * Math.sin(angle_rad),
            0
        );
        const points: Array<Vector3> = [];
        const direction = new Vector3().subVectors(last_point, first_point);
        const normalized_direction = direction.clone().normalize();
        const total_length = direction.length();
        const perp = new Vector3(-normalized_direction.y, normalized_direction.x, 0);
        const step_length = total_length / c.segments;
        for (let i = 0; i <= c.segments; i++) {
            const base = normalized_direction.clone().multiplyScalar(i * step_length).add(first_point);
            let offset = 0;
            if (i !== 0 && i !== c.segments) {
                offset = (i % 2 === 0 ? 1 : -1) * c.amplitude;
            }
            const offset_scaler = perp.clone().multiplyScalar(offset);
            const point = base.add(offset_scaler);
            points.push(point);
        }
        const geometry = new BufferGeometry().setFromPoints(points);
        const material = new LineBasicMaterial({
            color: c.color
        });
        return new Line(geometry, material);
    }
}