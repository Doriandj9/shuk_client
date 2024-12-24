

export const cloneObject = (obj: object | unknown): object | unknown => {
    let clone: object | unknown = obj;
    if (typeof structuredClone === 'function') {
        clone = structuredClone(obj);
    } else {
        clone = JSON.parse(JSON.stringify(obj));
    }

    return clone;
};