import { url, options } from "../theMovieDb";

export const getMovieSearch = async (query: string, pageNum: number) => {
    try {
        const response = await fetch(`${url}/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNum}`, options)
        const data = await response.json();
        return data
    } catch (error) {
        console.error("getMovieSearch:", error)
        throw error
    }
}

export const getPersonSearch = async (query: string, pageNum: number) => {
    try {
        const response = await fetch(`${url}/search/person?query=${query}&include_adult=false&language=en-US&page=${pageNum}`, options)
        const data = await response.json();
        return data
    } catch (error) {
        console.error("getMovieSearch:", error)
        throw error
    }
}