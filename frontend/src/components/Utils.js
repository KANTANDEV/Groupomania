export const dateParser = (num) => {
    let options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options)

    return date.toString();
}

export const isEmpty = (value) => {
    return (
        value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}