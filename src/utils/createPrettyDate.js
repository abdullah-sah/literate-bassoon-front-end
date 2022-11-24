function createPrettyDate(uglyDate) {
    const date = new Date(uglyDate)
    const datePretty = date.toDateString()
    return datePretty
}

export default createPrettyDate;
