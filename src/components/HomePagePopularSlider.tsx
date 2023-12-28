import Carousel from "./Carousel";
import Image from "./Image";
import MovieDetailsType from "../models/MovieDetails.types";
import "../styles/homePagePopularSlider.css"
import { useNavigate } from "react-router-dom";

type HomePagePopularSliderProps = {
    movieData: MovieDetailsType[];
}

const HomePagePopularSlider: React.FC<HomePagePopularSliderProps> = ({movieData}) => {

    const navigate = useNavigate();

    return (
        <Carousel numberPerSlide={1} autoplay={true} infinite={true} fade={true} dots={true}>
            {movieData.map((movie) => (
                <div key={movie.id} className="homePagePopularSlider">
                    <Image imageUrl={movie.backdrop_path}>
                        <div className="movie-info">
                            <div className="movie-title">{movie.title}</div>
                                <button onClick={() => {
                                    navigate(`/details/${movie.id}`)
                                }}>
                                    More Info
                                </button>
                        </div>
                    </Image>
                </div>
            ))}
        </Carousel>
    );
};

export default HomePagePopularSlider;