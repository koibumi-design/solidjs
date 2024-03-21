type CombineClassList = {
    [key: string]: boolean | undefined
}

export function combineClassList(
    baseClass: string | undefined,
    ...classLists: (CombineClassList | undefined)[]
): CombineClassList {
    const result: CombineClassList = {};
    if (baseClass) {
        result[baseClass] = true;
    }
    classLists.forEach((classList) => {
        if (!classList) {
            return;
        }
        Object.keys(classList).forEach((key) => {
            if (classList[key]) {
                result[key] = true;
            }
        });
    });
    return result;
}