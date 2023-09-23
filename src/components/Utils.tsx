export function removeDateMask(dateWithMask: string) {
    const fields = dateWithMask.split('/');
    return fields[2] + '-' + fields[1] + '-' + fields[0];
}

export function addDateMask(dateWithoutMask: string) {
    const fields = dateWithoutMask.split('-');
    return fields[2] + '/' + fields[1] + '/' + fields[0];
}