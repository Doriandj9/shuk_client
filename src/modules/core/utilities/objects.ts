

export const cloneObject = <T>(obj: object | unknown | T): object | unknown | T => {
    let clone: object | unknown = obj;
    if (typeof structuredClone === 'function') {
        clone = structuredClone(obj);
    } else {
        clone = JSON.parse(JSON.stringify(obj));
    }

    return clone;
};