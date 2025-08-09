import { JS3CoreLauncher } from "./js3";
import { Text } from "./component/text";
import { Floor, Platform, Pole, Polygon, Rect } from "./component";
import { Color, Group, Vector3 } from "three";
import { JS3Node } from "./js3";
import { Underlift } from "./component/underlift";

JS3CoreLauncher.render_image(({ scene: s }) => {
    {
/*         s.add(Pole.from({

        }));
        s.add(Pole.from({
            x: 250,
        }));
        s.add(Polygon.from_buffer_geometry_and_basic_line_material({
            y: 40,
            color: new Color("blue"),
            points: [
                new Vector3(50, 450),
                new Vector3(275, 450)
            ]
        })); */
    }

    const scaffold = () => {
        const h = 1600;
        const left_pole = Pole.from({
            h
        });
        const right_pole = Pole.from({
            x: 250,
            h
        });
        return new Group()
            .add(left_pole)
            .add(right_pole);
    };

    const platform_section = (with_rect?: boolean) => {
        const platform_section_h = 50;
        const platform_section_area_w = 250;
        const platform_section_floor = Platform.from({
            x: 0,
            y: 0,
            w: platform_section_area_w,
            h: platform_section_h
        });
        let platform_section_rect;
        if (with_rect) {
            platform_section_rect = Rect.from_buffer_geometry_and_basic_line_material({
                color: new Color("blue"),
                x: platform_section_area_w / 4,
                y: platform_section_h / 2,
                w: platform_section_area_w / 2,
                h: 200
            });
        } else {
            platform_section_rect = new Group();
        }
        const platform_section_bottom_intersection_line = Rect.from_shape_geometry_and_basic_mesh_material({
            color: new Color("blue"),
            x: 0,
            y: 100,
            w: platform_section_area_w,
            h: 5
        });
        const platform_section_top_intersection_line = Rect.from_shape_geometry_and_basic_mesh_material({
            color: new Color("blue"),
            w: platform_section_area_w,
            h: 5,
            x: 0,
            y: 200
        });
        const platform_section_bottom_scaffold = Rect.from_shape_geometry_and_basic_mesh_material({
            color: new Color("blue"),
            w: platform_section_area_w,
            h: 5,
            x: 0,
            y: -10
        });
        const underlift = Underlift.from({
            x: 10,
            y: -60,
            w: 300,
            h: 100,
            color: new Color("blue")
        })
        return new Group()
            .add(platform_section_floor)
            .add(platform_section_rect)
            .add(platform_section_bottom_intersection_line)
            .add(platform_section_top_intersection_line)
            .add(platform_section_bottom_scaffold)
            .add(underlift);
    };

    const intersection_line = () => {
        const line = Rect.from_shape_geometry_and_basic_mesh_material({
            color: new Color("green"),
            w: 250,
            h: 5,
            x: 40,
            y: 200
        });
        return new Group().add(line);
    };

    const platform_0 = platform_section(true);
    platform_0.position.x = 40;
    platform_0.position.y = 400;
    const platform_1 = platform_section(true);
    platform_1.position.x = 40;
    platform_1.position.y = 800;
    const platform_2 = platform_section();
    platform_2.position.x = 40;
    platform_2.position.y = 1200;

    const top_intersection_0 = intersection_line();
    top_intersection_0.position.y = 1300;

    const top_intersection_1 = intersection_line();
    top_intersection_1.position.y = 1400;

    const left_scaffold = new Group()
        .add(scaffold())
        .add(platform_0)
        .add(platform_1)
        .add(platform_2)
        .add(top_intersection_0)
        .add(top_intersection_1);

    const right_scaffold = left_scaffold.clone();
    right_scaffold.position.x += 2000;

    const g = new Group()
        .add(left_scaffold)
        .add(right_scaffold);

    g.position.x = -1000;
    g.position.y = -1000;
    s.add(g);

    return [() => undefined, [
        JS3CoreLauncher.enable_core,
        JS3CoreLauncher.enable_responsive_resize,
        JS3CoreLauncher.enable_orbit_control,
        //JS3CoreLauncher.enable_grid
    ]];
});

// impalcati - deck or platform
// scale - stair/ladder
// tavolati - planking/boarding/floorboards
// ponteggio - scaffold
// anchoraggi a tasssello o cravatta - anchors with anchor bolts or tie rods