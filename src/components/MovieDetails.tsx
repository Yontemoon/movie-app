import { useEffect, useState, useRef } from "react";
// import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import VideoPlayer from "./TrailerVideo";
import { useLoaderData } from "react-router-dom";
import "../styles/movieDetails.css"
import Carousel from "./Carousel";
import MovieDetailsType from "../models/MovieDetails.types";
import MovieCreditsType, { CrewType } from "../models/MovieCredits.types";
import MovieImagesType, { ImageType } from "../models/MovieImages.types";
import MovieVideoTypes, { MovieVideoType } from "../models/MovieVideos.types";
import ModalImage from "./ModalImage";
import DownloadableImages from "./DownloadableImages";
// import ClipVideo from "./ClipVideo";
import WrapMovies from "./WrapMovies";
import { getMovieRecommendations } from "../api/routes/movieDetails";
import defaultAvatar from "../images/default-avatar.png";
import playButton from "../images/play-circle.svg"


type LoaderDataType = {
    movieDetails: MovieDetailsType;
    movieCredits: MovieCreditsType;
    movieImages: MovieImagesType;
    movieVideos: MovieVideoTypes;
    movieRecommendations: MovieDetailsType[];
    totalMovieRecommendationsPages: number;
}

const MovieDetails = () => {
    const {movieDetails, movieCredits, movieImages, movieVideos, movieRecommendations, totalMovieRecommendationsPages}: LoaderDataType = useLoaderData() as LoaderDataType
    console.log("CREDITS", movieCredits.crew)
    console.log(movieRecommendations)
    const [openModel, setOpenModel] = useState(false)
    const [selectedImage, setSelectedImage] = useState<ImageType | MovieVideoType | null>(null)
    const [director, setDirector]= useState <CrewType | null | undefined> (null)
    const [writers, setWriters] = useState<CrewType[] | null>(null)
    const [producers, setProducers] = useState<CrewType[] | null>(null)
    const [trailer, setTrailer] = useState<MovieVideoType | null | undefined>(null)
    const [showRecommendations, setShowRecommendations] = useState<MovieDetailsType[] | null>(null)
    const pageNumber: React.MutableRefObject<number> = useRef(1)
    
    useEffect (() => {
        window.scrollTo(0, 0)
        const getDirector = movieCredits.crew.find((member) => member.job === "Director")
        const writers = movieCredits.crew.filter((member) => member.department === "Writing")
        const getProducers = movieCredits.crew.filter((member) => member.job === "Producer")
        const findTrailer = movieVideos.find((video) => video.type === "Trailer")
  
        if(findTrailer !== null && findTrailer !== undefined) {
            setTrailer(findTrailer)
        }
        if (getDirector !== null && getDirector !== undefined) {
            setDirector(getDirector)
        }
        setProducers(getProducers)
        setWriters(writers)
        setShowRecommendations(movieRecommendations)
        pageNumber.current = 1
    },[movieCredits.crew, movieVideos, movieRecommendations, pageNumber])

    const handleRecommendations = async () => {
        pageNumber.current++
        const newRecommendationsInfo = await getMovieRecommendations(movieDetails.id, pageNumber.current);
        const newRecommendations: MovieDetailsType[] = newRecommendationsInfo.results
        setShowRecommendations((oldRecommendations): MovieDetailsType[] => {
            if (!oldRecommendations) {
                return newRecommendations;
            }
            const uniqueNewRecommendations = newRecommendations.filter((newRecommendation) => 
                !oldRecommendations.some((oldRecommendation) => oldRecommendation.id === newRecommendation.id)
            )
            return [...oldRecommendations, ...uniqueNewRecommendations]
        })
    }

    const handleAvatarError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = defaultAvatar
        event.currentTarget.className = "actor-avatar"
    }

    return (
        <div id="movieDetailsPage">
            <div className="movie-background-container">
                <img className="movie-background" src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} alt={`${movieDetails.title}`}/>
            </div>
            <div className="starting-position">
            </div>
            <div className="body">
                <div className="movie-info-container">
                    <div className="movie-info-left">
                        <div className="movie-poster-container">
                            <img  className="movie-poster" src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt={`${movieDetails.title}`}/>
                        </div>
                        <div>
                            <button>Watch Trailer</button>
                        </div>
                        {/* <div>
                            {trailer !== null && trailer !== undefined && <VideoPlayer video={trailer}/>}
                        </div> */}
                    </div>
                    <div className="movie-info-right">

                        <h1 className="movie-info-title">{movieDetails.title}</h1>
                        <p className="movie-info-release_date">{movieDetails.release_date}</p>
                        <p className="movie-info-tagline">{movieDetails.tagline}</p>
                        {/* <h3>Directed by {director}</h3> */}
                        <hr/>
                        <p>{movieDetails.overview}</p>
                        <hr/>
                        <div className="castList">
                            <p>
                                {director !== null && director !== undefined && <p>Director:&nbsp;<Link to={`/actor/${director.id}`}>{director.name}</Link></p>}
                            </p>
                            <p>
                                <p>Writer(s):&nbsp;</p>
                                {writers !== null && writers.map((writer) => (
                                    <p key={writer.id}>
                                        <Link to={`/actor/${writer.id}`}>{writer.name}</Link>&nbsp;
                                    </p>
                                ))}
                            </p>
                            <p>
                                <p>Producer(s):&nbsp;</p>
                                {producers !== null && producers.map((producer) => (
                                    <p key={producer.id}>
                                        <Link to={`/actor/${producer.id}`}>{producer.name}</Link>&nbsp;
                                    </p>
                                ))}
                            </p>
                        </div>
                        <hr/>
                        <p>
                            <Link to={`/details/${movieDetails.id}/cast`}>
                                See Full Cast & Crew
                            </Link>
                        </p>
                    </div>
                </div>
                    <h1>Top Billed Cast</h1>
                    <Carousel numberPerSlide={8}>
                        {movieCredits.cast.map((actor) => (
                            <div key={actor.id}>
                                <div>
                                    <div className="actor-avatar-container"> 
                                        <img 
                                            className="actor-avatar"
                                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} 
                                            onError={handleAvatarError}
                                            alt={actor.name}
                                        />
                                    </div>
                                    <Link to={`/actor/${actor.id}`}><h3>{actor.name}</h3></Link>
                                    <h4>{actor.character}</h4>
                                </div>    
                            </div>
                        ))}
                    </Carousel>
                    <hr/>
                    <h1>Trailers, Clips & Featurettes</h1>
                    <Carousel numberPerSlide={4}>
                        {movieVideos.map((video) => (
                            <div key={video.id} className="movie-video-container">
                                <img className="image" src={`http://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={`http://img.youtube.com/vi/${video.key}/hqdefault.jpg`}/>
                                <img 
                                    className="play-button"
                                    src={playButton} 
                                    alt={playButton} 
                                    onClick={() => {
                                        setOpenModel(true)
                                        setSelectedImage(video)
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>

                    { selectedImage !== null && <ModalImage poster={selectedImage} openModel={openModel} setOpenModel={setOpenModel} />}
                    <hr/>
                    <h1>Posters</h1>
                    <DownloadableImages movieImages={movieImages.posters} setOpenModel={setOpenModel} setSelectedImage={setSelectedImage}/>

                    <hr/>
                    <h1>Backdrop Images</h1>
                    <DownloadableImages movieImages={movieImages.backdrops} setOpenModel={setOpenModel} setSelectedImage={setSelectedImage}/>

                    
                    {showRecommendations === null || showRecommendations.length === 0 ? null : (
                        <>  
                            <hr/>
                            <h1>Recommendations</h1>
                            <WrapMovies movies={showRecommendations}/>
                            {pageNumber.current !== totalMovieRecommendationsPages && (<button onClick={handleRecommendations}>See More...</button>)}

                        </>
                    )}
                </div>
            </div>
        // </div>
    );
};

export default MovieDetails;