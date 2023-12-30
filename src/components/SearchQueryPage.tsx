import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieDetailsType from '../models/MovieDetails.types';
import SearchActorType from '../models/SearchActor.types';
import imageUrl from '../library/imageUrl';
import "../styles/searchQueryPage.css"
import defaultImage from "../images/landscape.png"
import { Link } from 'react-router-dom';
import formatDate from '../library/formatDate';
import Pagnation from './Pagnation';

type LoaderDataType = {
    searchedMovies: MovieDetailsType[];
    searchedPersons: SearchActorType[];
    movieSearchedTotalResults: number;
    personSearchedTotalResults: number;
    searched: string
}

const SearchQueryPage = () => {
    const { searchedMovies, searchedPersons, movieSearchedTotalResults, personSearchedTotalResults, searched }: LoaderDataType = useLoaderData() as LoaderDataType;
    // console.log("SEARCHED", searched)
    // console.log("MOVIES:", searchedMovies)
    // console.log("MOVIE NUMBER", movieSearchedTotalResults)
    // console.log("PERSON:", searchedPersons)
    const [currentFilter, setCurrentFilter] = useState("movies")
    const [currentItems, setCurrentItems] = useState<MovieDetailsType[] | SearchActorType[] | null>(null)
    const [pageCount, setPageCount] = useState(0);

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = defaultImage; 
    }

    const handleFilter = (filterType: string) => {
        // console.log(filterType)
        if (currentFilter === filterType) return;
        const replacedFilter = document.getElementById(currentFilter);
        replacedFilter?.classList.remove("picked-filter")
        setCurrentFilter(filterType)

        if (filterType === "movies") {
            setCurrentItems(searchedMovies)
            setPageCount(Math.ceil(movieSearchedTotalResults / 20))
        } else {
            setCurrentItems(searchedPersons)
            setPageCount(Math.ceil(personSearchedTotalResults / 20))
        }

        const currentFilterId = document.getElementById(filterType)
        currentFilterId?.classList.add("picked-filter")
    }

    useEffect(() => {

        console.log(currentFilter)
        const getActorFilter = document.getElementById("people")
        getActorFilter?.classList.remove("picked-filter")
        const getCurrentFilterId = document.getElementById("movies")
        getCurrentFilterId?.classList.add("picked-filter")
        setCurrentFilter("movies")
        setCurrentItems(searchedMovies)
        setPageCount(Math.ceil(movieSearchedTotalResults / 20))
    },[searched, searchedMovies])

    
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
                {currentFilter === "movies" && currentItems !== null && (currentItems.map((searchedMovie) => (
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

                {currentFilter === "people" && currentItems !== null && (currentItems.map((searchedPerson) => (
                    <div className="movie-container" key={searchedPerson.id}>
                        <Link to={`/actor/${searchedPerson.id}`}>
                            <img src={`${imageUrl}${searchedPerson.profile_path}`} alt={searchedPerson.name} onError={handleImageError}/>
                        </Link>
                        <div>
                            <Link to={`/actor/${searchedPerson.id}`}>
                                <h3 className='movie-info movie-title'>{searchedPerson.name}</h3>
                            </Link>
                            <h4 className='movie-info movie-release'>{formatDate(searchedPerson.known_for_department)}</h4>
                            {/* <p className='movie-info movie-overview'>{searchedPerson.overview === "" ? "There is currently no overview for this movie." : searchedMovie.overview}</p> */}
                        </div>
                    </div>
                )))}
                <Pagnation 
                    searched={searched} 
                    currentItems={currentItems} 
                    pageCount={pageCount} 
                    setPageCount={setPageCount} 
                    setCurrentItems={setCurrentItems} 
                    currentFilter={currentFilter}
                />
            </div>
        </div>
    );
};

export default SearchQueryPage;