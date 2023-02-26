const getDuplicates = (values: Array<string>): Array<string> => {
    const uniq = values
    .map((value) => {
        return {
            count: 1,
            value: value
        };
    })
    .reduce((result, b) => {
        result[b.value] = (result[b.value] || 0) + b.count;

        return result;
    }, {});
    const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
    return duplicates;
}

export { getDuplicates }