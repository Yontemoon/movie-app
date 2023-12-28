import { createContext, useState } from 'react';
// import { getMovieByYear } from '../api/theMovieDb';
import { MovieType } from '../models/Movietype.types';

type MovieProviderProps = {
    children: React.ReactNode
}

export type MovieContextType = {
    movies: MovieType[] | null
    setMovies: React.Dispatch<React.SetStateAction<MovieType[] | null>>
}

export const MovieContext = createContext <MovieContextType> ({} as MovieContextType)

// export const useMovieContext = () => useContext(MovieContext)

const MovieProvider = ({ children }: MovieProviderProps) => {
    const [movies, setMovies] = useState< MovieType[] | null>(null)

    return (
        <MovieContext.Provider value={{movies, setMovies}}>
            {children}
        </MovieContext.Provider>
    );
};



export default MovieProvider;