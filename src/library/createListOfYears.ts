const createListOfYears = (earliersYear: number, oldestYear: number) => {
    const list: number[] = []
    for (let i = earliersYear; i >= oldestYear; i--) {
        list.push(i)
    }
    return list
}

export default createListOfYears