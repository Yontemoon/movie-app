import ActorMovieCreditsTypes from "../models/ActorMovieCredits.types"

type sortByDateTypes = {
    date1: ActorMovieCreditsTypes["release_date"];
    date2: ActorMovieCreditsTypes["release_date"]
}

const sortByDate = (date1, date2) => {
    if(date1.release_date < date2.release_date) {
        return -1
    } 
    if (date1.release_date > date2.release_date) {
        return 1
    }
    return 0

} 

export default sortByDate