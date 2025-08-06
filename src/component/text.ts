import { Option } from "ts-results-es";
import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { Color } from "three";
import { Group } from "three";
import { Mesh } from "three";
import { MeshStandardMaterial } from "three";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { TTFLoader } from "three/examples/jsm/Addons.js";
import { Font } from "three/examples/jsm/Addons.js";

export namespace Text {

    export type Configuration = {
        url?: string,
        size?: number
    };

    export async function from(s: string, configuration?: Configuration): Promise<Option<Group>> {
        try {
            const url = configuration?.url ?? "https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap";
            const size = configuration?.size ?? 1;
            const fontData = await new TTFLoader().loadAsync(url);
            const font = new Font(fontData);
            const geometry = new TextGeometry(s, {
                font,
                size
            });
            geometry.computeBoundingBox();
            const material = new MeshStandardMaterial({
                color: new Color(0x202020)
            });
            const mesh = new Mesh(geometry, material);
            const g = new Group().add(mesh);
            return Some(g);
        } catch {
            return None;
        }
    }
}