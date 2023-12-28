import { MovieContext, MovieContextType } from "../providers/MovieProvider";
import { useContext, useEffect } from 'react'
import { MovieType } from "../models/Movietype.types";
import { useLoaderData, useParams } from "react-router-dom";
import Table from "./Table";
import { getMovieByYear } from "../api/theMovieDb";
import LineGraph from "./LineGraph";

const ListByYears = () => {
    const {id} = useParams()
    const {movies, setMovies}  = useContext(MovieContext) as MovieContextType
    const movieLoaderData = useLoaderData() as MovieType[]
    useEffect(() => {
        setMovies(movieLoaderData)
    },[])

    const AddMoreMovies = async () => {
        if (movies !== null ) {
            const currentPages = movies.length / 20
            const addedMovies = await getMovieByYear(currentPages + 1, Number(id))
            const newMovies = [...movies, ...addedMovies];
            setMovies(newMovies)
        }
    }
    
    return (
        <div>
            <LineGraph/>
            <button onClick={AddMoreMovies}>Add More Movies 20x</button>

            {movies !== null && <Table />}
        </div>
    );
};

export default ListByYears;