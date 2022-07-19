export const dateParser = (num) => {
    let options = { weekday: "long", month: "short", day: "numeric", year: "numeric"};

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options)

    return date.toString();
}
