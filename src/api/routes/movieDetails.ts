import { url, options } from "../theMovieDb";



export const getMovieDetails = async (id: number) => {
    try {
        const response = await fetch(`${url}/movie/${id}?language=en-US`, options)
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}

export const getMovieCredits = async (id: number) => {
    try {
        const response = await fetch (`${url}/movie/${id}/credits?language=en-US`, options) 
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error", error);
        throw error
    }
}

export const getMovieImages = async (id: number) => {
    try {
        const response = await fetch (`${url}/movie/${id}/images`, options) 
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error", error);
        throw error
    }
}

export const getMovieVideos = async (id: number) => {
    try {
        const response = await fetch (`${url}/movie/${id}/videos?language=en-US`, options) 
        const data = await response.json()
        return data.results;
    } catch (error) {
        console.error("getMovieVideos Error:", error);
        throw error
    }
}

export const getMovieSimilar = async (id:number) => {
    try {
        const response = await fetch(`${url}/movie/${id}/similar?language=en-US&page=1`, options)
        const data = await response.json()
        return data.results;
    } catch (error) {
        console.error("getMovieSimilar ERROR:", error)
        throw error
    }
}

export const getMovieRecommendations = async (id:number, page: number) => {
    try {
        const response = await fetch(`${url}/movie/${id}/recommendations?language=en-US&page=${page}`, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("getMovieRecommendations ERROR:", error)
        throw error
    }
}
