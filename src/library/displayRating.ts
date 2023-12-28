const displayRating = (rating: number) => {
    if(rating === 0) return "TBD"
    return Math.round(rating * 10) / 10
}

export default displayRating