import { Color } from "three";
import { DoubleSide } from "three";
import { LinearFilter } from "three";
import { Group } from "three";
import { MeshBasicMaterial } from "three";
import { Mesh } from "three";
import { PlaneGeometry } from "three";
import { Texture } from "three";
import { require } from "../support";

export namespace Text {

    export type Origin = 
        | "left"
        | "center"
        | "right";

    export type Configuration = {
        size?: number,
        reso?: number,
        origin?: Origin,
        color?: Color
    };

    export function from(s: string, cfg?: Configuration): Group {
        cfg ??= {};
        cfg.size ??= 100;
        cfg.reso ??= 5;
        cfg.origin ??= "center";
        cfg.color ??= new Color(0x202020);
        require(cfg.reso >= 1);
        require(cfg.reso <= 10);
        const font_size = 128 * cfg.reso;
        const padding = 50 * cfg.reso;
        const temporary_canvas = document.createElement("canvas");
        const temporary_canvas_context = temporary_canvas.getContext("2d");
        require(!!temporary_canvas_context);
        temporary_canvas_context.font = `${font_size}px sans-serif`;
        const temporary_canvas_measurement = temporary_canvas_context.measureText(s);
        const canvas_w = Math.ceil(temporary_canvas_measurement.width) + padding * 2;
        const canvas_h = font_size + padding * 2;
        const canvas = document.createElement("canvas");
        canvas.width = canvas_w;
        canvas.height = canvas_h;
        const canvas_context = canvas.getContext("2d");
        require(!!canvas_context);
        canvas_context.fillStyle = cfg.color.getHexString();
        canvas_context.font = `${font_size}px sans-serif`;
        canvas_context.textAlign = "center";
        canvas_context.textBaseline = "middle";
        canvas_context.fillText(s, canvas_w / 2, canvas_h / 2);
        const texture = new Texture(canvas);
        texture.needsUpdate = true;
        texture.flipY = true;
        texture.magFilter = LinearFilter;
        const base_plane_h = cfg.size;
        const plane_w = (canvas_w / canvas_h) * base_plane_h;
        const plane_h = base_plane_h;
        const map = texture;
        const side = DoubleSide;
        const transparent = true;
        const geometry = new PlaneGeometry(plane_w, plane_h);
        const material = new MeshBasicMaterial({ map, side, transparent });
        const mesh = new Mesh(geometry, material);
        switch (origin) {
            case "left":
                mesh.position.x = plane_w / 2;
                break;
            case "right":
                mesh.position.x = -plane_w / 2;
                break;
            case "center":
            default:
                break;
        }
        return new Group().add(mesh);
    }
}