import { JS3CoreLauncher } from "./js3";
import { Text } from "./component/text";
import { Pole, Rect } from "./component";

JS3CoreLauncher.render_image(({ scene: s }) => {
    s.add(Pole.from({
        w: 100,
        h: 100
    }));

    return [() => {

    }, [
        JS3CoreLauncher.enable_core,
        JS3CoreLauncher.enable_responsive_resize,
        JS3CoreLauncher.enable_zoom,
        //JS3CoreLauncher.enable_grid
    ]];
});

// impalcati - deck or platform
// scale - stair/ladder
// tavolati - planking/boarding/floorboards
// ponteggio - scaffold
// anchoraggi a tasssello o cravatta - anchors with anchor bolts or tie rods