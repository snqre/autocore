import * as js3 from "three";

export type LadderConfig = {
    w: number,
    len: number,
    step_spacing: number
};

export function ladder(c: LadderConfig) {
    const step_count: number = Math.floor(c.len / c.step_spacing);
    const left_rail = new_line([
        new js3.Vector3(0, 0),
        new js3.Vector3(0, c.len)
    ]);
    const right_rail = new_line([
        new js3.Vector3(0, 0),
        new js3.Vector3(0, c.len)
    ]);
    right_rail.position.x = c.w;
    const g = new js3.Group();
    g.add(left_rail);
    g.add(right_rail);
    for (let i = 1; i <= step_count - 1; i++) {
        const y = i * c.step_spacing;
        const rung = new_line([
            new js3.Vector3(0, y, 0),
            new js3.Vector3(c.w, y, 0)
        ]);
        g.add(rung);
    }
    return g;
}



export type ZigZagLineConfiguration = {
    first_point: js3.Vector3,
    last_point: js3.Vector3,
    amplitude: number,
    segments: number,
    color?: js3.Color
};

// /\/\/\/\/\
export function zig_zag_line(c: ZigZagLineConfiguration) {
    c.color ??= new js3.Color(0x202020);

    const points: js3.Vector3[] = [];

    // Direction vector from start to end
    const dir = new js3.Vector3().subVectors(c.last_point, c.first_point);
    const totalLength = dir.length();

    // Normalize direction
    const dirNorm = dir.clone().normalize();

    // Perpendicular vector in XY plane (swap x and y, negate one)
    const perp = new js3.Vector3(-dirNorm.y, dirNorm.x, 0);

    // Step size along the line
    const stepLength = totalLength / c.segments;

    for (let i = 0; i <= c.segments; i++) {
        const base = dirNorm.clone().multiplyScalar(i * stepLength).add(c.first_point);
        let offset = 0;
        if (i !== 0 && i !== c.segments) {
            offset = (i % 2 === 0 ? 1 : -1) * c.amplitude;
        }
        const point = base.add(perp.clone().multiplyScalar(offset));
        points.push(point);
    }

    const geometry = new js3.BufferGeometry().setFromPoints(points);
    const material = new js3.LineBasicMaterial({ color: c.color });
    return new js3.Line(geometry, material);
}




export function new_line(points: js3.Vector3[], color: number = 0x000000): js3.Line {
    const geometry = new js3.BufferGeometry().setFromPoints(points);
    const material = new js3.LineBasicMaterial({ color });
    return new js3.Line(geometry, material);
}

export type DrawConfiguration = {
    points: Array<js3.Vector3>,
    fill?: boolean,
    close?: boolean,
    color?: js3.Color,
    line_w?: number
}

export function draw(cfg: DrawConfiguration): js3.Object3D {
    if (cfg.points.length < 2) {
        throw Error();
    }
    const g = new js3.Group();
    const first_vec = cfg.points.at(0);
    if (first_vec === undefined) {
        throw Error();
    }
    const first_x = first_vec.x;
    const first_y = first_vec.y;
    if (cfg.fill) {
        const shape = new js3.Shape();
        shape.moveTo(first_x, first_y);
        for (let i = 1; i < cfg.points.length; i++) {
            shape.lineTo(first_x, first_y);
        }
        if (cfg.close) {
            shape.lineTo(first_x, first_y);
        }
        const geometry = new js3.ShapeGeometry(shape);
        const material = new js3.MeshBasicMaterial({
            color: cfg.color,
            side: js3.DoubleSide
        });
        const mesh = new js3.Mesh(geometry, material);
        g.add(mesh);
    }
    const line_points = cfg.close ? [...cfg.points, first_vec] : [...cfg.points];
    const line_geometry = new js3.BufferGeometry().setFromPoints(line_points);
    const line_material = new js3.LineBasicMaterial({
        color: cfg.color,
        linewidth: cfg.line_w
    });
    const line = new js3.Line(line_geometry, line_material);
    g.add(line);
    return g;
}



export function pole(h: number, color: number = 0x666666): js3.Mesh {
    const radius = 1;
    const geometry = new js3.CylinderGeometry(radius, radius, h);
    const material = new js3.MeshBasicMaterial({
        color
    });
    return new js3.Mesh(geometry, material);
}

export function connector(start: js3.Mesh, end: js3.Mesh): js3.Mesh {
    const start_vec = new js3.Vector3(center_x_of(start), center_y_of(start), start.position.z);
    const end_vec = new js3.Vector3(center_x_of(end), center_y_of(end), end.position.z);
    const direction = new js3.Vector3().subVectors(end_vec, start_vec);
    const len = direction.length();
    const geometry = new js3.CylinderGeometry(1, 1, len, 8);
    const material = new js3.MeshBasicMaterial({
        color: 0x000000
    });
    const mesh = new js3.Mesh(geometry, material);
    const midpoint = new js3.Vector3().addVectors(start_vec, end_vec).multiplyScalar(0.5);
    mesh.position.copy(midpoint);
    const up = new js3.Vector3(0, 1, 0);
    const quaternion = new js3.Quaternion().setFromUnitVectors(up, direction.clone().normalize());
    mesh.quaternion.copy(quaternion);
    return mesh;
}



export function rot_45_deg(mesh: js3.Mesh) {
    mesh.rotation.z += 45;
}

export function w_of(mesh: js3.Mesh): number {
    return max_x_of(mesh) - min_x_of(mesh);
}

export function h_of(mesh: js3.Mesh): number {
    return max_y_of(mesh) - min_y_of(mesh);
}

export function max_x_of(mesh: js3.Mesh): number {
    return bounding_box_of(mesh).max.x;
}

export function min_x_of(mesh: js3.Mesh): number {
    return bounding_box_of(mesh).min.x;
}

export function max_y_of(mesh: js3.Mesh): number {
    return bounding_box_of(mesh).max.y;
}

export function min_y_of(mesh: js3.Mesh): number {
    return bounding_box_of(mesh).min.y;
}

export function center_x_of(mesh: js3.Mesh): number {
    return mesh.position.x;
}

export function center_y_of(mesh: js3.Mesh): number {
    return mesh.position.y;
}

export function bounding_box_of(mesh: js3.Mesh): js3.Box3 {
    return new js3.Box3().setFromObject(mesh);
}