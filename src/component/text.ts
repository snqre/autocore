import { Result as PrimResult } from "ts-results-es";
import { Ok } from "ts-results-es";
import { Err } from "ts-results-es";
import { Color, DoubleSide, LinearFilter, MeshBasicMaterial, PlaneGeometry, Texture } from "three";
import { Group } from "three";
import { Mesh } from "three";

export namespace Text {
    export type Result<T> = PrimResult<T, Error | string>;

    export enum Error {
        MissingTemporaryCanvasContext,
        MissingCanvasContext
    }

    export type Origin = 
        | "left"
        | "center"
        | "right";

    export type Configuration = {
        size?: number,
        resolution?: number,
        origin?: Origin,
        color?: Color
    };

    export function from(text: string, configuration?: Configuration): Result<Group> {
        try {
            const resolution = configuration?.resolution ?? 4;
            const fontSize = 128 * resolution;
            const padding = 50 * resolution;
            const measurementR = _measurement(text, fontSize, padding);
            if (measurementR.isErr()) return measurementR;
            const [canvasWidth, canvasHeight] = measurementR.safeUnwrap();
            const canvasR = _canvas(text, canvasWidth, canvasHeight, fontSize, configuration?.color);
            if (canvasR.isErr()) return canvasR;
            const canvas = canvasR.safeUnwrap();
            const textureR = _texture(canvas);
            if (textureR.isErr()) return textureR;
            const texture = textureR.safeUnwrap();
            const basePlaneHeight = configuration?.size ?? 100;
            const planeWidth = (canvasWidth / canvasHeight) * basePlaneHeight;
            const planeHeight = basePlaneHeight;
            const meshR = _textMesh(texture, planeWidth, planeHeight);
            if (meshR.isErr()) return meshR;
            const mesh = meshR.safeUnwrap();
            _applyOriginOffset(mesh, planeWidth, configuration?.origin ?? "center");
            const group = new Group();
            group.add(mesh);
            return Ok(group);
        } catch (e) {
            return Err(String(e));
        }
    }

    function _measurement(text: string, fontSize: number, padding: number): Result<[number, number]> {
        try {
            const temporaryCanvas = document.createElement("canvas");
            const temporaryCanvasContext = temporaryCanvas.getContext("2d");
            if (!temporaryCanvasContext) return Err(Error.MissingTemporaryCanvasContext);
            temporaryCanvasContext.font = `${fontSize}px sans-serif`;
            const measurement = temporaryCanvasContext.measureText(text);
            const width = Math.ceil(measurement.width) + padding * 2;
            const height = fontSize + padding * 2;
            return Ok([width, height]);
        } catch (e) {
            return Err(String(e));
        }
    }

    function _canvas(text: string, width: number, height: number, fontSize: number, color?: Color): Result<HTMLCanvasElement> {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasContext = canvas.getContext("2d");
            if (!canvasContext) return Err(Error.MissingCanvasContext);
            canvasContext.fillStyle = color?.getHexString() ?? "#202020";
            canvasContext.font = `${fontSize}px sans-serif`;
            canvasContext.textAlign = "center";
            canvasContext.textBaseline = "middle";
            canvasContext.fillText(text, canvasWidth / 2, canvasHeight / 2);
            return Ok(canvas);
        } catch (e) {
            return Err(String(e));
        }
    }

    function _texture(canvas: HTMLCanvasElement): Result<Texture> {
        try {
            const texture = new Texture(canvas);
            texture.needsUpdate = true;
            texture.flipY = false;
            texture.magFilter = LinearFilter;
            return Ok(texture);
        } catch (e) {
            return Err(String(e));
        }
    }

    function _textMesh(texture: Texture, width: number, height: number): Result<Mesh> {
        try {
            const map = texture;
            const side = DoubleSide;
            const transparent = true;
            const geometry = new PlaneGeometry(width, height);
            const material = new MeshBasicMaterial({ map, side, transparent });
            const mesh = new Mesh(geometry, material);
            return Ok(mesh);
        } catch (e) {
            return Err(String(e));
        }
    }

    function _applyOriginOffset(mesh: Mesh, width: number, origin: Origin): void {
        switch (origin) {
            case "left":
                mesh.position.x = width / 2;
                break;
            case "right":
                mesh.position.x = -width / 2;
                break;
            case "center":
            default:
                // no shift
                break;
        }
    }
}