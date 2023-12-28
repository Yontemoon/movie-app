import { useLoaderData } from "react-router-dom";
import ActorDetailsTypes from "../models/ActorDetails.types";
import "../styles/actorDetails.css"
import ActorMovieCreditsTypes from "../models/ActorMovieCredits.types";
import imageUrl from "../library/imageUrl";
import { useEffect } from "react";
import WrapMovies from "./WrapMovies";

type ActorLoaderDataType = {
    actorDetails: ActorDetailsTypes;
    actorMovieCredits: ActorMovieCreditsTypes[]
}

const ActorDetails = () => {
    const {actorDetails, actorMovieCredits}: ActorLoaderDataType = useLoaderData() as ActorLoaderDataType
    console.log(actorMovieCredits)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
        <div className="upper-section">
            <div className="profile-section">
                <img src={`${imageUrl}${actorDetails.profile_path}`} alt="testing"/>
            </div>
            <div className="actor-info-parent">
                <h1>{actorDetails.name}</h1>
                <div className="actor-info-child">
                    <div>
                        <h2>Department</h2>
                        <h2>Birthday</h2>
                        <h2>Place of Birth</h2>
                    </div>
                    <div>
                        <h2>{actorDetails.known_for_department}</h2>
                        <h2>{actorDetails.birthday}</h2>
                        <h2>{actorDetails.place_of_birth}</h2>
                    </div>
                </div>
                <div>
                    <h2>Biography</h2>
                    <p>{actorDetails.biography}</p>
                </div>
            </div>
        </div>
        <div>

        </div>
            <h1>{actorDetails.name}'s Movies</h1>
            <WrapMovies movies={actorMovieCredits}/>
        </div>
    );
};

export default ActorDetails;