import { url, options } from "../theMovieDb"

export const getMovieByYear = async (pageNum: number, year: number) => {
    try {
        const response = await fetch(`${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&primary_release_year=${year}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31&sort_by=vote_count.desc`, options)
        const data = await response.json();
        return data.results
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}

export const getNowPlaying = async () => {
    try {
        const response = await fetch(`${url}/movie/now_playing?language=en-US&page=1&region=us`, options)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}

export const getUpComing = async () => {
    try {
        const response = await fetch(`${url}/movie/upcoming?language=en-US&page=1&region=us`, options)
        const data = await response.json()
        return data.results
    } catch(error) {
        console.error("Error:", error)
        throw error
    }
}


export const getTopRated = async () => {
    try {
        const response = await fetch(`${url}/movie/top_rated?language=en-US&page=1&region=us`, options)
        const data = await response.json()

        return data.results
    } catch(error) {
        console.error("Error:", error)
        throw error
    }
}

export const getPopular = async () => {
    try {
        const response = await fetch(`${url}/movie/popular?language=en-US&page=1&region=us`, options)
        const data = await response.json()
        const slicedData = data.results.slice(0, 5)
        return slicedData
    } catch(error) {
        console.error("Error:", error)
        throw error
    }
}
