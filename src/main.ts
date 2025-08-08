import { JS3CoreLauncher } from "./js3";
import { Text } from "./component/text";

JS3CoreLauncher.render_image(({ scene: s }) => {
    s.add(Text.from("My name is steve", {
        size: 200
    }));

    return [() => {

    }, [
        JS3CoreLauncher.enable_core,
        //JS3CoreLauncher.enable_responsive_resize,
        //JS3CoreLauncher.enable_zooming,
        //JS3CoreLauncher.enable_panning
    ]];
});

// impalcati - deck or platform
// scale - stair/ladder
// tavolati - planking/boarding/floorboards
// ponteggio - scaffold
// anchoraggi a tasssello o cravatta - anchors with anchor bolts or tie rods