import { Color, Group, Vector3 } from "three";
import { only_below_max_iter } from "../support";
import { require } from "../support";
import { Rope } from "./rope";

export namespace Net {

    export type Area = {
        top_left: Vector3,
        top_right: Vector3,
        bottom_left: Vector3,
        bottom_right: Vector3
    };

    export type Configuration = {
        // from top left to 
        area: Area,
        color?: Color,
        opacity?: number,
        col_count?: number,
        row_count?: number,
        reso?: number,
        tension?: number
    };

    export function from(cfg: Configuration) {
        cfg.color ??= new Color("green");
        cfg.opacity ??= 1;
        cfg.col_count ??= 10;
        cfg.row_count ??= 10;
        cfg.reso ??= 32;
        cfg.tension ??= 8;
        const g = new Group();
        for (let row = 0; row <= cfg.row_count; row++) {
            only_below_max_iter(row);
            if (row !== 0 && row !== cfg.row_count) {
                const t = row / cfg.row_count;
                const left =  new Vector3().lerpVectors(cfg.area.top_left, cfg.area.bottom_left, t);
                const right = new Vector3().lerpVectors(cfg.area.top_right, cfg.area.bottom_right, t);
                g.add(Rope.from({
                    x_0: left.x,
                    y_0: left.y,
                    x_1: right.x,
                    y_1: right.y,
                    reso: cfg.reso,
                    tension: cfg.tension,
                    color: cfg.color,
                    opacity: cfg.opacity
                }));
            }
        }
        for (let col = 0; col <= cfg.col_count; col++) {
            only_below_max_iter(col);
            // col === 0 || col === cfg.col_count
            if (true) {
                const t = col / cfg.col_count;

                // interpolate top side between topLeft & topRight
                const top = new Vector3().lerpVectors(cfg.area.top_left, cfg.area.top_right, t);
                // interpolate bottom side between bottomLeft & bottomRight
                const bottom = new Vector3().lerpVectors(cfg.area.bottom_left, cfg.area.bottom_right, t);

                g.add(Rope.from({
                    x_0: top.x,
                    y_0: top.y,
                    x_1: bottom.x,
                    y_1: bottom.y,
                    reso: cfg.reso,
                    tension: cfg.tension,
                    color: cfg.color,
                    opacity: cfg.opacity
                }));
            }
        }

        return g;
    }
}