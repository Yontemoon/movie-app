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
                <img className="profile-image"src={`${imageUrl}${actorDetails.profile_path}`} alt="testing"/>
            </div>
            <div className="actor-info-parent">
                <h2>{actorDetails.name}</h2>
                <div className="actor-info-child">
                    <div className="actor-info-headers">
                        <p>Department</p>
                        <p>Birthday</p>
                        <p>Place of Birth</p>
                    </div>
                    <div>
                        <p>{actorDetails.known_for_department}</p>
                        <p>{actorDetails.birthday}</p>
                        <p>{actorDetails.place_of_birth}</p>
                    </div>
                </div>
                <hr/>
                <div className="biography-section">
                    <h2>Biography</h2>
                    <p className="biography-paragraph">{actorDetails.biography}</p>
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