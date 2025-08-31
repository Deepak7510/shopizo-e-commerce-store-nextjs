
export const stringShorter = function (value: string, wordLength: number) {
    const stringLength = value.split(" ").length;
    const shortString = value.split(" ").slice(0, wordLength).join(" ")
    return stringLength > wordLength ? shortString.concat("...") : shortString
}


export const dateResolver = function (dateValue: Date) {
    return dateValue.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
