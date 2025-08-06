import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { JS3SketchLauncher } from "./js3";

(await JS3SketchLauncher.renderAsync(async node => {
    try {
        node.scene.position.x = 0;
        node.scene.position.y = 0;

        return Some(() => {
            
        });
    } catch {
        return None;
    }
})).unwrap();




// impalcati - deck or platform
// scale - stair/ladder
// tavolati - planking/boarding/floorboards
// ponteggio - scaffold
// anchoraggi a tasssello o cravatta - anchors with anchor bolts or tie rods