import { JS3SketchLauncher } from "./js3";
import { JS3Win } from "./js3";
import { Coordinate, Pole, Scaffold } from "./component";
import { Platform } from "./component/platform";
import { Color, Vector3 } from "three";

JS3SketchLauncher.render(c => {
    c.scene.position.x = 0;
    c.scene.position.y = 0;

    const s = Coordinate.from(Pole.from({
        y: 400
    }), {
        color: new Color(0x202020),
        offset_x: 0,
        offset_y: 0,
        size: 20
    })
 
    s.position.x = 200;
    s.position.y = 200;


    c.scene.add(s);


    return () => {
        
    };
});




// impalcati - deck or platform
// scale - stair/ladder
// tavolati - planking/boarding/floorboards
// ponteggio - scaffold
// anchoraggi a tasssello o cravatta - anchors with anchor bolts or tie rods