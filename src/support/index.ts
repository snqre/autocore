export function require(condition: boolean, msg?: string): asserts condition {
    if (!condition) {
        const e = Error(msg);
        
        Error.captureStackTrace(e, require);
        throw e;
    }
}