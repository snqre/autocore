import { Mesh } from "three";
import { Group } from "three";
import { Camera } from "three";
import { Box3 } from "three";
import { MathUtils as Math } from "three";
import { Vector3 } from "three";

export abstract class Component {
    public abstract get node(): Mesh | Group | Camera;


    // MARK: size

    public get w(): number {
        return this.max_x - this.min_x;
    }

    public get h(): number {
        return this.max_y - this.min_y;
    }


    // MARK: position

    public get x(): number {
        return this.node.position.x;
    }

    public get y(): number {
        return this.node.position.y;
    }

    public get z(): number {
        return this.node.position.z;
    }


    public get top_left(): Vector3 {
        return new Vector3(this.top_left_x, this.top_left_y, this.z);
    }

    public get top_left_x(): number {
        return this.min_x;
    }

    public get top_left_y(): number {
        return this.max_y;
    }


    public get top_right(): Vector3 {
        return new Vector3(this.top_right_x, this.top_right_y, this.y);
    }

    public get top_right_x(): number {
        return this.max_x;
    }

    public get top_right_y(): number {
        return this.max_y;
    }


    public get bottom_left(): Vector3 {
        return new Vector3(this.bottom_left_x, this.bottom_left_y, this.y);
    }

    public get bottom_left_x(): number {
        return this.min_x;
    }

    public get bottom_left_y(): number {
        return this.min_y;
    }


    public get bottom_right(): Vector3 {
        return new Vector3(this.bottom_right_x, this.bottom_right_y, this.y);
    }

    public get bottom_right_x(): number {
        return this.max_x;
    }

    public get bottom_right_y(): number {
        return this.min_y;
    }


    public get center_top(): Vector3 {
        return new Vector3(this.center_top_x, this.center_top_y, this.z);
    }

    public get center_top_x(): number {
        return this.center_x;
    }

    public get center_top_y(): number {
        return this.max_y;
    }


    public get center_bottom(): Vector3 {
        return new Vector3(this.center_bottom_x, this.center_bottom_y, this.z);
    }

    public get center_bottom_x(): number {
        return this.center_x;
    }

    public get center_bottom_y(): number {
        return this.min_y;
    }


    public get center_left(): Vector3 {
        return new Vector3(this.center_left_x, this.center_left_y, this.y);
    }

    public get center_left_x(): number {
        return this.min_x;
    }

    public get center_left_y(): number {
        return this.center_y;
    }


    public get center_right(): Vector3 {
        return new Vector3(this.center_right_x, this.center_right_y, this.y);
    }

    public get center_right_x(): number {
        return this.max_x;
    }

    public get center_right_y(): number {
        return this.center_y;
    }


    public get center(): Vector3 {
        return new Vector3(this.center_x, this.center_y, this.y);
    }

    public get center_x(): number {
        return (this.max_x + this.min_x) / 2;
    }

    public get center_y(): number {
        return (this.max_y + this.min_y) / 2;
    }


    public set_x(n: number): void {
        this.node.position.x = n;
    }

    public set_y(n: number): void {
        this.node.position.y = n;
    }


    // MARK: bounding-box

    public get max_x(): number {
        return this.bounding_box.max.x;
    }

    public get min_x(): number {
        return this.bounding_box.min.x;
    }

    public get max_y(): number {
        return this.bounding_box.max.y;
    }

    public get min_y(): number {
        return this.bounding_box.min.y;
    }

    public get depth(): number {
        return this.bounding_box.max.z - this.bounding_box.min.z;
    }

    public get bounding_box(): Box3 {
        return new Box3().setFromObject(this.node);
    }


    // MARK: angle

    public rot_x(deg: number): void {
        const rad = Math.degToRad(deg);
        this.node.rotateX(rad);
    }

    public rot_y(deg: number): void {
        const rad = Math.degToRad(deg);
        this.node.rotateY(deg);
    }

    public rot_z(deg: number): void {
        const rad = Math.degToRad(deg);
        this.node.rotateZ(rad);
    }
}