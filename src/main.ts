import { Some } from "ts-results-es";
import { None } from "ts-results-es";
import { JS3SketchLauncher } from "./js3";
import { ZigZagLine } from "./component";
import { Text } from "./component/text";

(await JS3SketchLauncher.renderAsync(async node => {
    try {
        const demoLine = (await Text.from("s666vss sssss h(200m, 48m)", {
            origin: "left"
        })).unwrap();
        
        node.scene.position.x = 200;
        node.scene.position.y = 200;
        node.scene.add(demoLine);
        
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