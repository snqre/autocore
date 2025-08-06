import * as $js3 from "three";
import * as $win from "./js3launcher";

export type Opt = {
    set_w(meter: number): void,
    set_h(meter: number): void
};

export type Ctx = {
    scene: $js3.Scene,
    camera: $js3.Camera,
    frame: $js3.Group,
    controller: Opt
};

export type PlugIn = (c: Ctx) => void;

export function frame(plug_in: PlugIn) {
    $win.render((s, c) => {
        
        return {

        };
    });
}