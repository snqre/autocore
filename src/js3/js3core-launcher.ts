import { Color, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry } from "three";
import { Camera } from "three";
import { Scene } from "three";
import { WebGLRenderer } from "three";
import { Group } from "three";
import { JS3Scene } from ".";
import { JS3Camera } from ".";
import { JS3WebGLRenderer } from ".";
import { JS3Node } from ".";
import { Text } from "../component/text";

export namespace JS3CoreLauncher {
    export const WORLD_W: number = 500;
    export const WORLD_H: number = 500;

    export type Environment = {
        world: Group,
        webgl: WebGLRenderer,
        scene: Scene,
        camera: Camera
    };

    export type OnAnimationFrame = () => void;
    export type OnRender = (environment: Environment) => OnAnimationFrame;

    export function render(on_render: OnRender) {
        const win_w = window.innerWidth;
        const win_h = window.innerHeight;
        const s = JS3Scene.from_default();
        const c = JS3Camera.from_orthographic_projection(WORLD_W, WORLD_H, 0.1, 1000);
        const webgl = JS3WebGLRenderer.from(s, c, win_w, win_h);
        const world = new Group();
        enable(s, c, webgl, world);
        enable_zooming(webgl.domElement, c);
        enable_panning(webgl.domElement, c);
        const on_animation_frame = on_render({ scene: s, camera: c, webgl, world });
        const on_animation_frame_begin = () => {
            requestAnimationFrame(on_animation_frame_begin);
            on_animation_frame();
            webgl.render(s, c);
        };
        on_animation_frame_begin();
    }

    function enable_zooming(canvas: HTMLCanvasElement, camera: OrthographicCamera) {
        const c = canvas;
        const cm = camera;
        let zoom = 1;
        const min_zoom = 0.25;
        const max_zoom = 4;
        const zoom_factor = 0.1;
        const base_w = cm.right - cm.left;
        const base_h = cm.top - cm.bottom;

        const update_frustum = () => {
            const cx = cm.position.x;
            const cy = cm.position.y;
            const new_w = base_w / zoom;
            const new_h = base_h / zoom;
            cm.left = cx - new_w / 2;
            cm.right = cx + new_w / 2;
            cm.top = cy + new_h / 2;
            cm.bottom = cy - new_h / 2;
            cm.updateProjectionMatrix();
        };

        c.addEventListener("wheel", e => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? -1 : 1;
            zoom += delta * zoom_factor;
            zoom = Math.min(Math.max(zoom, min_zoom), max_zoom);
            update_frustum();
        }, { passive: false });

        update_frustum();
    }

    function enable_panning(canvas: HTMLCanvasElement, camera: OrthographicCamera) {
        const c = canvas;
        const cm = camera;
        let is_dragging = false;
        let last_x = 0;
        let last_y = 0;

        c.addEventListener("pointerdown", e => {
            is_dragging = true;
            last_x = e.clientX;
            last_y = e.clientY;
            c.setPointerCapture(e.pointerId);
        });

        c.addEventListener("pointermove", e => {
            if (!is_dragging) {
                return;
            }
            const dx = e.clientX - last_x;
            const dy = e.clientY - last_y;
            const view_w = cm.right - cm.left;
            const view_h = cm.top - cm.bottom;
            const canvas_w = c.clientWidth;
            const canvas_h = c.clientHeight;
            const world_dx = -(dx / canvas_w) * view_w;
            const world_dy = (dy / canvas_h) * view_h;
            cm.position.x += world_dx;
            cm.position.y += world_dy;
            cm.lookAt(cm.position.x, cm.position.y, 0);
            last_x = e.clientX;
            last_y = e.clientY;
        });

        const stop_drag = (e: PointerEvent) => {
            is_dragging = false;
            c.releasePointerCapture(e.pointerId);
        };

        c.addEventListener("pointerup", stop_drag);
        c.addEventListener("pointerleave", stop_drag);
    }

    function enable(scene: Scene, camera: OrthographicCamera, webgl: WebGLRenderer, world: Group) {
        const s = scene;
        const c = camera;
        const w = world;
        const world_w = WORLD_W;
        const world_h = WORLD_H;
        const world_geometry = new PlaneGeometry(world_w, world_h);
        const world_material = new MeshBasicMaterial({
            color: new Color("green"),
            wireframe: true,
            opacity: 1,
            transparent: true
        });
        const world_boundary = new Mesh(world_geometry, world_material);
        const bottom_left_coordinate_marker = Text.from("(0m, 0m)", { size: 50 }).unwrap();
        bottom_left_coordinate_marker.position.x = JS3Node.top_left_pos_x_of(world_boundary) - 25;
        bottom_left_coordinate_marker.position.y = JS3Node.top_left_pos_y_of(world_boundary) + 25;
        s.add(w);
        s.add(bottom_left_coordinate_marker);
        c.position.set(0, 0, 100);
        c.up.set(0, 1, 0);
        c.lookAt(0, 0, 0);
        w.add(world_boundary);
        document.body.appendChild(webgl.domElement);
    }
}