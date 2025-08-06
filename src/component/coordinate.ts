import { CanvasTexture, Group, MeshBasicMaterial, Sprite, SpriteMaterial } from "three";
import { Color } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export namespace Coordinate {

    export type Configuration = {
        offset_x?: number,
        offset_y?: number,
        color?: Color,
        size?: number
    };

    export function from(children: Group, configuration?: Configuration): Group {
        const x = children.position.x;
        const y = children.position.y;
        const label = `(${x}, ${y})`;

        const offsetX = configuration?.offset_x ?? 0;
        const offsetY = configuration?.offset_y ?? 20;
        const color = configuration?.color ?? new Color(0x000000);
        const fontSize = configuration?.size ?? 24;

        // Create a canvas and draw the text
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        const padding = 10;
        context.font = `${fontSize}px sans-serif`;
        const textWidth = context.measureText(label).width;
        canvas.width = textWidth + padding * 2;
        canvas.height = fontSize + padding * 2;

        // Re-apply font after resizing canvas
        context.font = `${fontSize}px sans-serif`;
        context.fillStyle = "#" + color.getHexString();
        context.fillText(label, padding, fontSize + padding / 2);

        // Create texture
        const texture = new CanvasTexture(canvas);
        texture.needsUpdate = true;

        // Create sprite with texture
        const material = new SpriteMaterial({ map: texture, transparent: true });
        const sprite = new Sprite(material);

        // Scale sprite so it appears readable in scene
        const scale = 0.5;
        sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
        sprite.position.set(x + offsetX, y + offsetY, 0.1);

        const g = new Group();
        g.add(children);
        g.add(sprite);

        return g;
    }
}