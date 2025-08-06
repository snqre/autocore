import { Vector3, Group, BufferGeometry, Line, LineBasicMaterial } from "three";

export namespace Scaffold {
    
    export type Configuration = {
        bayCount?: number;
        liftCount?: number;
        bayWidth?: number;
        liftHeight?: number;
        origin?: Vector3;
    };

    /**
     * Generates a chunk of scaffold from the origin.
     */
    export function from({
        bayCount = 3,
        liftCount = 2,
        bayWidth = 2,
        liftHeight = 2,
        origin = new Vector3(0, 0, 0)
    }: Configuration = {}) {
        const group = new Group();

        // Vertical Standards (Uprights)
        for (let i = 0; i <= bayCount; i++) {
            const x = origin.x + i * bayWidth;
            for (let j = 0; j <= liftCount; j++) {
                const y1 = origin.y + j * liftHeight;
                const y2 = y1 + liftHeight;
                const geometry = new BufferGeometry().setFromPoints([
                    new Vector3(x, y1, origin.z),
                    new Vector3(x, y2, origin.z),
                ]);
                const line = new Line(geometry, new LineBasicMaterial({ color: 0x555555 }));
                group.add(line);
            }
        }

        // Horizontal Ledgers
        for (let j = 0; j <= liftCount + 1; j++) {
            const y = origin.y + j * liftHeight;
            for (let i = 0; i < bayCount; i++) {
                const x1 = origin.x + i * bayWidth;
                const x2 = x1 + bayWidth;
                const geometry = new BufferGeometry().setFromPoints([
                    new Vector3(x1, y, origin.z),
                    new Vector3(x2, y, origin.z),
                ]);
                const line = new Line(geometry, new LineBasicMaterial({ color: 0x888888 }));
                group.add(line);
            }
        }

        return group;
    }
}