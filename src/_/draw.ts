import * as $js3 from "three";

export const COLOR = new $js3.Color(0x202020);

export type BoxConfiguration = {
    x?: number,
    y?: number,
    w?: number,
    h?: number,
    angle?: number,
    color?: $js3.Color,
    fill?: boolean,
    radius?: number
};

export type LineConfiguration = {
    x?: number,
    y?: number,
    angle?: number,
    length?: number,
    color?: $js3.Color
};

export type ZigZagLineConfiguration = {
    x?: number,
    y?: number,
    angle?: number,
    length?: number,
    amplitude?: number, 
    segments?: number, 
    color?: $js3.Color
};

export enum Direction {
    Top = 270,
    TopLeft = 225,
    TopRight = 315,
    Bottom = 90,
    BottomRight = 45,
    BottomLeft = 135,
    Left = 180,
    Right = 0
}

export function pole(): $js3.Group {
    const w = 10;
    const left_side = line({
        x: 0 - (w / 2),
        y: 0,
        angle: Direction.Bottom
    });
    const right_side = line({
        x: 0 + (w / 2),
        y: 0,
        angle: Direction.Bottom
    });
    const g = new $js3.Group();
    g.add(left_side);
    g.add(right_side);
    return g;
}

export function scaffold(): $js3.Group {
    const amplitude = 3;
    const segments = 50;
    const rail_handle_length = 100;
    const rail_handle_direction = Direction.Right;
    const top = zig_zag_line({
        x: 0,
        y: 0,
        angle: rail_handle_direction,
        length: rail_handle_length,
        segments,
        amplitude
    });
    const f = zig_zag_line({
        x: 0,
        y: 10,
        angle: rail_handle_direction,
        length: rail_handle_length,
        segments,
        amplitude
    });
    const x = line({
        x: 0,
        y: 13,
        angle: Direction.Top,
        length: 20
    });
    const right_rail = line({
        x: 100,
        y: 13,
        angle: Direction.Top,
        length: 20
    });
    const g = new $js3.Group();
    g.add(top);
    g.add(f);
    g.add(x);
    g.add(right_rail);
    return g;
}

export function box(c: BoxConfiguration): $js3.Object3D {
    c.color ??= COLOR;
    c.x ??= 0;
    c.y ??= 0;
    c.w ??= 100;
    c.h ??= 100;
    c.angle ??= 0;
    c.fill ??= true;
    c.radius ??= 0;
    const shape = new $js3.Shape();
    const w = c.w;
    const h = c.h;
    const r = Math.min(c.radius, w / 2, h / 2);
    if (r > 0) {
        shape
            .moveTo(r, 0)
            .lineTo(w - r, 0)
            .quadraticCurveTo(w, 0, w, r)
            .lineTo(w, h  -r)
            .quadraticCurveTo(w, h, w - r, h)
            .lineTo(r, h)
            .quadraticCurveTo(0, h, 0, h - r)
            .lineTo(0, r)
            .quadraticCurveTo(0, 0, r, 0);
    } else {
        shape
            .moveTo(0, 0)
            .lineTo(w, 0)
            .lineTo(w, h)
            .lineTo(0, h)
            .closePath();
    }
    const object = c.fill
        ? new $js3.Mesh(
            new $js3.ShapeGeometry(shape),
            new $js3.MeshBasicMaterial({ color: c.color, side: $js3.DoubleSide })
        )
        : new $js3.LineLoop(
            new $js3.BufferGeometry().setFromPoints(shape.getPoints()),
            new $js3.LineBasicMaterial({ color: c.color })
        );

    // Center box at (x, y) and apply rotation
    object.position.x = c.x - w / 2;
    object.position.y = c.y - h / 2;
    object.rotation.z = (c.angle * Math.PI) / 180;

    return object;
}

export function zig_zag_line(c: ZigZagLineConfiguration): $js3.Line {
    c.color ??= COLOR;
    c.amplitude ??= 8;
    c.segments ??= 8;
    c.x ??= 0;
    c.y ??= 0;
    c.angle ??= 0;
    c.length ??= 100;
    const angle_in_radians = c.angle * Math.PI / 180;
    const first_point = new $js3.Vector3(c.x, c.y);
    const last_point = new $js3.Vector3(
        c.x + c.length * Math.cos(angle_in_radians),
        c.y + c.length * Math.sin(angle_in_radians),
        0
    );
    const points: Array<$js3.Vector3> = [];
    const direction = new $js3.Vector3().subVectors(last_point, first_point);
    const normalized_direction = direction.clone().normalize();
    const total_length = direction.length();
    const perp = new $js3.Vector3(-normalized_direction.y, normalized_direction.x, 0);
    const step_length = total_length / c.segments;
    for (let i = 0; i <= c.segments; i++) {
        const base = normalized_direction
            .clone()
            .multiplyScalar(i * step_length)
            .add(first_point);
        let offset = 0;
        if (i !== 0 && i !== c.segments) {
            offset = (i % 2 === 0 ? 1 : -1) * c.amplitude;
        }
        const offset_scaler = perp.clone().multiplyScalar(offset);
        const point = base.add(offset_scaler);
        points.push(point);
    }
    const geometry = new $js3.BufferGeometry().setFromPoints(points);
    const material = new $js3.LineBasicMaterial({
        color: c.color
    });
    return new $js3.Line(geometry, material);
}

export function line(c: LineConfiguration): $js3.Line {
    c.color ??= COLOR;
    c.x ??= 0;
    c.y ??= 0;
    c.angle ??= 0;
    c.length ??= 100;
    const angle_in_radians = c.angle * Math.PI / 180;
    const first_point = new $js3.Vector3(c.x, c.y, 0);
    const last_point = new $js3.Vector3(
        c.x + c.length * Math.cos(angle_in_radians),
        c.y + c.length * Math.sin(angle_in_radians),
        0
    );
    const points = [first_point, last_point];
    const geometry = new $js3.BufferGeometry().setFromPoints(points);
    const material = new $js3.LineBasicMaterial({
        color: c.color
    });
    return new $js3.Line(geometry, material);
}