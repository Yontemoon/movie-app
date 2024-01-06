import { url } from "../theMovieDb";

export const getWatchlist = async (accessToken: string, accountId: number, pageNum: number) => {
    try {
        const response = await fetch(`${url}/account/${accountId}/watchlist/movies?language=en-US&page=${pageNum}&sort_by=created_at.asc';`, {
            method: 'GET',
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error("getWatchlist Error:", error)
        throw error
    }
}
