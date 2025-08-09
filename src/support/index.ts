export const MAX_ITER = 256;

export function only_below_max_iter(n: number | bigint) {
    require(n <= MAX_ITER);
}

export function require(condition: boolean, msg?: string): asserts condition {
    if (!condition) {
        const e = Error(msg);
        
        Error.captureStackTrace(e, require);
        throw e;
    }
}