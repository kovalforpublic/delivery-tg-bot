export function lowCased(
        target: any, 
        key: string, 
        desc: TypedPropertyDescriptor<(text: string) => any>
    ) {
    const method = desc.value;
    desc.value = function(str: string) {
        const lowCased = str.toLowerCase();
        return method.apply(this, [lowCased]);
    }

    return desc;
}