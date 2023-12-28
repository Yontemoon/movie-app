import "../styles/HomePageSlider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "./Carousel";
import { HomePageSliderType } from "../models/HomePageSlider.type";
import { useNavigate } from "react-router-dom";
import { handleGetYear } from '../library/formatDate';
import displayRating from "../library/displayRating";
import star from '../images/star-full.svg'

export type MovePageSliderProps = {
    movieData: HomePageSliderType[];
}

const HomePageSlider: React.FC<MovePageSliderProps> = ({movieData}) => {

    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = Number(event.currentTarget.value)
        navigate(`/details/${id}`)
    }

    return (
            <div className="homePageSlider">
                <Carousel numberPerSlide={5} >
                    {movieData.map((movie: HomePageSliderType) => (
                        <div key={movie.id} className="homePageSlider-child">
                            <div className="movie-container">
                                <img className="movie-poster"src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title}`}/>
                                <div className="movie-title">
                                    {movie.title}
                                </div>
                                <div className="movie-info">
                                    <p className="movie-release-year">{handleGetYear(movie.release_date)}</p>
                                    <div className="movie-rating">
                                        <p>{displayRating(movie.vote_average)}</p>
                                        <img className="star-icon" src={star} alt="star" />
                                    </div>
                                </div>
                                <button value={movie.id} onClick={handleClick}>More Information</button>
                            </div>
                        </div>
                    
                        )
                    )}
                </Carousel>
            </div>
    )
};

export default HomePageSlider;