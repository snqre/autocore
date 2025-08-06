import { Group } from "three";

export namespace Floor {

    export type Configuration = {
        y?: number
    };

    export function from(configuration: Configuration): Group {
        const y = configuration.y ?? 0;
        
    }
}