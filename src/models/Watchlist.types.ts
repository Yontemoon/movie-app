import MovieDetailsType from "./MovieDetails.types"

type WatchlistType = {
    page: number;
    total_pages: number;
    total_results: number;
    results: MovieDetailsType[];
}

export default WatchlistType