import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import isValid from 'date-fns/isValid'
import getYear from "date-fns/getYear"

const formatDate = (date: string) => {

    const parseDate = parseISO(date)
    if (isValid(parseDate)){
        const formatedDate = format(parseDate, `MMM do, yyyy`)
        return formatedDate
    } else {
        return "TBD"
    }
}

export const handleGetYear = (date: string) => {
    const parseDate = parseISO(date)
    if (isValid(parseDate)){
        const formatedDate = getYear(parseDate)
        return formatedDate
    } else {
        return "TBD"
    }
}

export default formatDate