type MovieVideoTypes = MovieVideoType[];


export type MovieVideoType = {
    iso_639_1: string
    iso_3166_1: string
    name: string;
    key: string
    site: "Youtube"
    size: number
    type: string
    official: true,
    published_at: string
    id: string
}

export default MovieVideoTypes