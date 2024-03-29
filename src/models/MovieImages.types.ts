type MovieImagesType = {
    backdrops: ImageType[];
    id: number;
    logos: ImageType[];
    posters: ImageType[];
}

export type ImageType = {
    aspect_ratio: number
    file_path: string
    height: number
    iso_639_1: null | string
    vote_average: number
    vote_count: number
    width: number
}

export default MovieImagesType