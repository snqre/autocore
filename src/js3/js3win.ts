export namespace JS3Win {
    
    export function w(): number {
        // @ts-ignore
        const win_w = window.innerWidth;

        if (typeof win_w !== "number") {
            throw new Error();
        }

        return win_w;
    }

    export function h(): number {
        // @ts-ignore
        const win_h = window.innerHeight;

        if (typeof win_h !== "number") {
            throw new Error();
        }

        return win_h;
    }
}