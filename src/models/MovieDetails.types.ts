type MovieDetailsType = {
    id: number;
    backdrop_path: string;
    budget: number;
    genres: genres[];
    homepage: string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number

}

type genres = {
    id: number;
    name: string
}

export default MovieDetailsType