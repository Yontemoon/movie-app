import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieDetailsType from '../models/MovieDetails.types';
import SearchActortype from '../models/SearchActor.types';
import imageUrl from '../library/imageUrl';
import "../styles/searchQueryPage.css"
import defaultImage from "../images/landscape.png"
import { Link } from 'react-router-dom';
import formatDate from '../library/formatDate';


type LoaderDataType = {
    searchedMovies: MovieDetailsType[];
    searchedPersons: SearchActortype[];
    movieSearchedTotalResults: number;
    personSearchedTotalResults: number
}

const SearchQueryPage = () => {
    const { searchedMovies, searchedPersons, movieSearchedTotalResults, personSearchedTotalResults }: LoaderDataType = useLoaderData() as LoaderDataType
    console.log("MOVIES:", searchedMovies)
    console.log("PERSON:", searchedPersons)
    const [currentFilter, setCurrentFilter] = useState("movies")

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = defaultImage; 
    }

    const handleFilter = (filterType: string) => {
        if (currentFilter === filterType) return;
        const replacedFilter = document.getElementById(currentFilter);
        replacedFilter?.classList.remove("picked-filter")
        setCurrentFilter(filterType)
        const currentFilterId = document.getElementById(filterType)
        currentFilterId?.classList.add("picked-filter")
    }

    useEffect(() => {
        const getCurrentFilterId = document.getElementById(currentFilter)
        getCurrentFilterId?.classList.add("picked-filter")
    })
    
    return (
        <div id="searched-query-page">
            <div className="filter-section">
                <header>
                    Filter Results
                </header>
                <div className="filter-options">
                    <button className="filter-row" onClick={() => handleFilter("movies")}>
                        <div className="filter-name" id="movies">
                            Movies
                        </div>
                        <div className="filter-total-results">
                            {movieSearchedTotalResults}
                        </div>
                    </button>
                    <button className="filter-row" onClick={() => handleFilter("people")}>
                        <div className="filter-name" id="people">
                            People
                        </div>
                        <div className="filter-total-results">
                            {personSearchedTotalResults}
                        </div>
                    </button>
                </div>
            </div>
            <div className="display-section">
                {currentFilter === "movies" && (searchedMovies.map((searchedMovie) => (
                    <div className="movie-container" key={searchedMovie.id}>
                        <Link to={`/details/${searchedMovie.id}`}>
                            <img className="movie-poster"src={`${imageUrl}${searchedMovie.poster_path}`} alt={searchedMovie.title} onError={handleImageError}/>
                        </Link>
                        <div>
                            <Link to={`/details/${searchedMovie.id}`}>
                                <h3 className='movie-info movie-title'>{searchedMovie.title}</h3>
                            </Link>
                            <h4 className='movie-info movie-release'>{formatDate(searchedMovie.release_date)}</h4>
                            <p className='movie-info movie-overview'>{searchedMovie.overview === "" ? "There is currently no overview for this movie." : searchedMovie.overview}</p>
                        </div>
                    </div>
                )))}

                {currentFilter === "people" && (searchedPersons.map((searchedPerson) => (
                    <div className="movie-container" key={searchedPerson.id}>
                        <Link to={`/details/${searchedPerson.id}`}>
                            <img src={`${imageUrl}${searchedPerson.profile_path}`} alt={searchedPerson.name} onError={handleImageError}/>
                        </Link>
                        <div>
                            <Link to={`/details/${searchedPerson.id}`}>
                                <h3 className='movie-info movie-title'>{searchedPerson.name}</h3>
                            </Link>
                            <h4 className='movie-info movie-release'>{formatDate(searchedPerson.known_for_department)}</h4>
                            {/* <p className='movie-info movie-overview'>{searchedPerson.overview === "" ? "There is currently no overview for this movie." : searchedMovie.overview}</p> */}
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
};

export default SearchQueryPage;