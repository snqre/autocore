import { Option } from "ts-results-es";
import { None } from "ts-results-es";
import { Vector3 } from "three";
import { Group } from "three";
import { Color } from "three";
import { Polygon } from "./polygon";

export namespace Rect {
    export type Configuration = {
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        color?: Color
    };

    export function fromShapeGeometryAndBasicMeshMaterial(configuration?: Configuration): Option<Group> {
        try {
            const w = configuration?.w ?? 100;
            const h = configuration?.h ?? 100;
            return Polygon.fromShapeGeometryAndBasicMeshMaterial({
                x: configuration?.x ?? 0,
                y: configuration?.x ?? 0,
                color: configuration?.color ?? new Color(0x202020),
                points: [
                    new Vector3(0, 0),
                    new Vector3(w, 0),
                    new Vector3(w, h),
                    new Vector3(0, h),
                    new Vector3(0, 0)
                ]
            });
        } catch {
            return None;
        }
    }

    export function fromBufferGeometryAndBasicLineMaterial(configuration?: Configuration): Option<Group> {
        try {
            const w = configuration?.w ?? 100;
            const h = configuration?.h ?? 100;
            return Polygon.fromBufferGeometryAndBasicLineMaterial({
                x: configuration?.x ?? 0,
                y: configuration?.y ?? 0,
                color: configuration?.color ?? new Color(0x202020),
                points: [
                    new Vector3(0, 0),
                    new Vector3(w, 0),
                    new Vector3(w, h),
                    new Vector3(0, h),
                    new Vector3(0, 0)
                ]
            });
        } catch {
            return None;
        }
    }
}