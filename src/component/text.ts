import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Color, DoubleSide, LinearFilter, MeshBasicMaterial, PlaneGeometry, Texture } from "three";
import { Group } from "three";
import { Mesh } from "three";

export namespace Text {
    export type Origin = 
        | "left"
        | "center"
        | "right";

    export type Configuration = {
        sizeOffset?: number,
        resolution?: number,
        origin?: Origin,
        color?: Color
    };

    export async function from(s: string, configuration?: Configuration): Promise<Option<Group>> {
        try {
            const resolution = configuration?.resolution ?? 4;
            const fontSize = 128 * resolution;
            const padding = 50 * resolution;
            const temporaryCanvas = document.createElement("canvas");
            const temporaryCanvasContext = temporaryCanvas.getContext("2d");
            if (!temporaryCanvasContext) return None;
            temporaryCanvasContext.font = `${fontSize}px sans-serif`;
            const textMeasurement = temporaryCanvasContext.measureText(s);
            const textWidth = Math.ceil(textMeasurement.width) + padding * 2;
            const textHeight = fontSize + padding * 2;
            const canvas = document.createElement("canvas");
            canvas.width = textWidth;
            canvas.height = textHeight;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasContext = canvas.getContext("2d");
            if (!canvasContext) return None;
            canvasContext.fillStyle = configuration?.color?.getHexString() ?? "#202020";
            canvasContext.font = `${fontSize}px sans-serif`;
            canvasContext.textAlign = "center";
            canvasContext.textBaseline = "middle";
            canvasContext.fillText(s, canvasWidth / 2, canvasHeight / 2);
            const texture = new Texture(canvas);
            texture.needsUpdate = true;
            texture.flipY = false;
            texture.magFilter = LinearFilter;
            const basePlaneHeight = configuration?.sizeOffset ?? 100;
            const planeWidth = (canvasWidth / canvasHeight) * basePlaneHeight;
            const planeHeight = basePlaneHeight;
            const map = texture;
            const side = DoubleSide;
            const transparent = true;
            const geometry = new PlaneGeometry(planeWidth, planeHeight);
            const material = new MeshBasicMaterial({ map, side, transparent });
            const mesh = new Mesh(geometry, material);
            switch (configuration?.origin) {
                case "left":
                    mesh.position.x = planeWidth / 2;
                    break;
                case "right":
                    mesh.position.y = -planeWidth / 2;
                    break;
                case "center":
                default:
                    break;
            }
            const group = new Group();
            group.add(mesh);
            return Some(group);
        } catch {
            return None;
        }
    }
}