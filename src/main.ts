import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { JS3SketchLauncher } from "./js3";
import { ZigZagLine } from "./component";
import { Text } from "./component/text";
import { Floor } from "./component";

(await JS3SketchLauncher.renderAsync(async node => {
    try {
        const floor = Floor.from({
            y: 500
        }).unwrap();
        
        node.scene.add(floor);


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