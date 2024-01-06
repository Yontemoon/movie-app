import watchlistAdd from "../images/bookmark-plus-f.svg"
import watchlistRemove from "../images/bookmark-minus.svg"
import watchlistFull from "../images/bookmark-full.svg"
import MovieDetailsType from "../models/MovieDetails.types"

type MoviePosterContainerType = {
    movieDetails: MovieDetailsType
}

const MoviePosterContainer: React.FC <MoviePosterContainerType> = ({movieDetails}) => {
    return (
        <div className="movie-poster-container">
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt={`${movieDetails.title}`}/>
            <img className="watchlist" src={watchlistAdd} alt="watchlistAdd"/>
        </div>
    );
};

export default MoviePosterContainer;