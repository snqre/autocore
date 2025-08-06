import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { BufferGeometry } from "three";
import { Color } from "three";
import { Line } from "three";
import { Group } from "three";
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

    export function fromBufferGeometryAndBasicLineMaterial(configuration?: Configuration): Option<Group> {
        try {
            const x = configuration?.x ?? 0;
            const y = configuration?.y ?? 0;
            const angle = configuration?.angle ?? 0;
            const angleRad = angle * Math.PI / 180;
            const length = configuration?.length ?? 100;
            const amplitude = configuration?.amplitude ?? 10;
            const segments = configuration?.segments ?? 10;
            const color = configuration?.color ?? new Color(0x202020);
            const firstPoint = new Vector3(x, y);
            const lastPoint = new Vector3(
                x + length * Math.cos(angleRad),
                y + length * Math.sin(angleRad),
                0
            );
            const points: Array<Vector3> = [];
            const direction = new Vector3().subVectors(lastPoint, firstPoint);
            const normalizedDirection = direction.clone().normalize();
            const totalLength = direction.length();
            const perp = new Vector3(-normalizedDirection.y, normalizedDirection.x, 0);
            const stepLength = totalLength / segments;
            for (let i = 0; i <= segments; i++) {
                const base = normalizedDirection
                    .clone()
                    .multiplyScalar(i * stepLength)
                    .add(firstPoint);
                let offset = 0;
                if (i !== 0 && i !== segments) {
                    offset = (i % 2 === 0 ? 1 : -1) * amplitude;
                }
                const scalar = perp.clone().multiplyScalar(offset);
                const point = base.add(scalar);
                points.push(point);
            }
            const geometry = new BufferGeometry().setFromPoints(points);
            const material = new LineBasicMaterial({ color });
            const line = new Line(geometry, material);
            const group = new Group();
            group.add(line);
            return Some(group);
        } catch {
            return None;
        }
    }
}