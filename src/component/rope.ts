import { BufferGeometry } from "three";
import { Color } from "three";
import { Line } from "three";
import { LineBasicMaterial } from "three";
import { Group } from "three";
import { Vector3 } from "three";
import { require } from "../support";

export namespace Rope {
 
    export type Configuration = {
        x_0?: number,
        y_0?: number,
        x_1?: number,
        y_1?: number,
        reso?: number,
        tension?: number,
        color?: Color,
        opacity?: number
    };

    export function from(cfg?: Configuration): Group {
        cfg ??= {};
        cfg.x_0 ??= 0;
        cfg.y_0 ??= 0;
        cfg.x_1 ??= 0;
        cfg.y_1 ??= 0;
        cfg.reso ??= 32;
        cfg.tension ??= 8;
        cfg.color ??= new Color(0x202020);
        cfg.opacity ??= 1;
        require(Number.isFinite(cfg.reso));
        require(cfg.reso >= 4);
        require(cfg.reso >= Number.MIN_SAFE_INTEGER);
        require(cfg.reso <= Number.MAX_SAFE_INTEGER);
        require(cfg.tension >= 0);
        require(cfg.tension <= 100);
        require(cfg.opacity >= 0);
        require(cfg.opacity <= 1);
        const base_points: Array<Vector3> = [];
        const dx = cfg.x_1 - cfg.x_0;
        const dy = cfg.y_1 - cfg.y_0;
        const len = Math.sqrt(dx * dx + dy * dy);
        for (let i = 0; i <= cfg.reso; i++) {
            require(i <= 256);
            const t = i / cfg.reso;
            const x = cfg.x_0 + dx * t;
            const y = cfg.y_0 + dy * t;
            const sag = (Math.sin(Math.PI * t) * len) / cfg.tension;
            base_points.push(new Vector3(x, y - sag, 0));
        }
        const geometry = new BufferGeometry().setFromPoints(base_points);
        const material = new LineBasicMaterial({
            color: cfg.color,
            opacity: cfg.opacity,
            transparent: cfg.opacity < 1
        });
        const line = new Line(geometry, material);
        const g = new Group();
        g.add(line);
        return g;
    }
}