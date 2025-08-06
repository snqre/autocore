import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { DoubleSide, LinearFilter, MeshBasicMaterial, PlaneGeometry, Texture } from "three";
import { Group } from "three";
import { Mesh } from "three";

export namespace Text {

    export type Configuration = {
        sizeOffset?: number
    };

    export async function from(s: string, configuration?: Configuration): Promise<Option<Group>> {
        try {
            const resolution = 4;
            

            const fontSize = (128 * resolution) + (configuration?.sizeOffset ?? 0);
            const canvasWidth = 1024 * resolution;
            const canvasHeight = 256 * resolution;
            const canvas = document.createElement("canvas");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const planeWidth = configuration?.sizeOffset ?? fontSize;
            const planeHeight = (canvas.height / canvas.width * planeWidth);
            const context2D = canvas.getContext("2d");
            if (context2D === null) {
                return None;
            }
            context2D.fillStyle = "black";
            context2D.font = `${fontSize}px sans-serif`;
            context2D.textBaseline = "middle";
            context2D.textAlign = "center";
            context2D.fillText(s, canvas.width / 2, canvas.height / 2);
            const texture = new Texture(canvas);
            texture.needsUpdate = true;
            texture.flipY = false;
            texture.magFilter = LinearFilter;
            const material = new MeshBasicMaterial({
                map: texture,
                side: DoubleSide
            });
            material.transparent = true;
            const mesh = new Mesh(new PlaneGeometry(planeWidth, planeHeight), material);
            const group = new Group().add(mesh);
            return Some(group);
        } catch {
            return None;
        }
    }
}