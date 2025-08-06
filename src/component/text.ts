import { Group } from "three";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { TTFLoader } from "three/examples/jsm/Addons.js";
import { Font } from "three/examples/jsm/Addons.js";

export namespace Text {

    export type Configuration = {
        url?: string,
        size?: number
    };

    export async function from(s: string, configuration?: Configuration): Promise<Group> {
        const url = configuration?.url ?? "https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap";
        const size = configuration?.size ?? 1;
        const font_data = await new TTFLoader().loadAsync(url);
        const font = new Font(font_data);
        const geometry = new TextGeometry(s, {
            font,
            size
        });
        geometry.computeBoundingBox();

    }
}