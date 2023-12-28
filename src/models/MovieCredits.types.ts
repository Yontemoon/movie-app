type MovieCreditsType = {
    cast: CastType[];
    crew: CrewType[]
}

type CastType = {
    id: number;
    cast_id: number;
    character: string;
    credit_id: string
    gender: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string
    popularity: number;
    profile_path: string
}

export type CrewType = {
    id: number;
    credit_id: string;
    department: string;
    job: string
    gender: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string
    popularity: number;
    profile_path: string
}

export default MovieCreditsType