import { BufferGeometry } from "three";
import { Color } from "three";
import { Line } from "three";
import { Group } from "three";
import { LineBasicMaterial } from "three";
import { Vector3 } from "three";
import { MathUtils } from "three";

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

    export function from_buffer_geometry_and_basic_line_material(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x ??= 0;
        cfg.y ??= 0;
        cfg.angle ??= 0;
        cfg.length ??= 100;
        cfg.amplitude ??= 10;
        cfg.segments ??= 10;
        cfg.color ??= new Color(0x202020);
        const rad = MathUtils.degToRad(cfg.angle);
        const first = new Vector3(cfg.x, cfg.y);
        const last = new Vector3(
            cfg.x + cfg.length * Math.cos(rad),
            cfg.y + cfg.length * Math.sin(rad),
            0  
        );
        const points: Array<Vector3> = [];
        const direction = new Vector3().subVectors(last, first);
        const normalized_direction = direction.clone().normalize();
        const total_length = direction.length();
        const perp = new Vector3(-normalized_direction.y, normalized_direction.x, 0);
        const step_length = total_length / cfg.segments;
        for (let i = 0; i <= cfg.segments; i++) {
            const base = normalized_direction
                .clone()
                .multiplyScalar(i * step_length)
                .add(first);
            let offset = 0;
            if (i !== 0 && i !== cfg.segments) {
                offset = (i % 2 === 0 ? 1 : -1) * cfg.amplitude;
            }
            const scaler = perp.clone().multiplyScalar(offset);
            const point = base.add(scaler);
            points.push(point);
        }
        const color = cfg.color;
        const geometry = new BufferGeometry().setFromPoints(points);
        const material = new LineBasicMaterial({ color });
        const line = new Line(geometry, material);
        return new Group().add(line);
    }
}