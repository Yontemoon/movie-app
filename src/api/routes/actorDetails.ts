import { url, options } from "../theMovieDb"

export const getActorDetails = async (id: number) => {
    try {
        const response = await fetch(`${url}/person/${id}?language=en-US`, options)
        const data = await response.json();
        return data
    } catch (error) {
        console.error("getActorDetails Error:", error)
        throw error
    }
}

export const getActorMovieCredits = async (id: number) => {
    try {
        const response = await fetch(`${url}/person/${id}/movie_credits?language=en-US`, options)
        const data = await response.json();
        const result = data.cast
        return result
    } catch (error) {
        console.error("getActorMovieCredits Error:", error)
        throw error
    }
}