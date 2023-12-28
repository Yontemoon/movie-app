import imageUrl from "../library/imageUrl";
import { useNavigate } from "react-router-dom";
import formatDate from "../library/formatDate";
import displayRating from "../library/displayRating";
import MovieDetailsType from "../models/MovieDetails.types";
import ActorMovieCreditsTypes from "../models/ActorMovieCredits.types";
import defaultImage from "../images/landscape.png"
import "../styles/wrapMovies.css"
import star from "../images/star-full.svg"

type WrapMoviesTypes = {
    movies: MovieDetailsType[] | ActorMovieCreditsTypes[] | null
}


const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage; 
    event.currentTarget.className = "movie-image"
}

const WrapMovies: React.FC<WrapMoviesTypes> = ({movies}) => {
    const navigate = useNavigate();
    return (
        <div id="movie-list">
        {movies?.map((movie) => (
            <div key={movie.id} className="movie-credit">
                <div onClick={() => navigate(`/details/${movie.id}`)}>
                    <img className="movie-image" src={`${imageUrl}${movie.poster_path}`} alt={movie.title} onError={handleImageError}/>
                </div>
                <div>
                    <div className="movie-info-row">
                        <p>{formatDate(movie.release_date)}</p>
                        <div className="movie-rating-row">
                            <p>{displayRating(movie.vote_average)}</p>
                            <img src={star} alt="star" className="rating-star"/>
                        </div>
                    </div>    
                    <h3 className="movie-title-row">{movie.title}</h3>
                </div> 
            </div>
        ))}
    </div>
    );
};

export default WrapMovies;