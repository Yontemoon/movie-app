import { useLoaderData } from "react-router-dom";
import MovieCreditsType from "../models/MovieCredits.types";
import imageUrl from "../library/imageUrl";
import "../styles/movieCreditsList.css"
// const defautImage = require('../images/default-poster.png')
import { Link } from "react-router-dom";

const MovieCreditsList = () => {
    const credits: MovieCreditsType = useLoaderData() as MovieCreditsType
    const casts = credits.cast;
    const crews = credits.crew
    console.log(crews)

    return (
        <div className="movie-credit-list-section">
            <div>
                <h2>Cast ({casts.length})</h2>
                {casts.map((cast) => (
                    <div key={cast.id} className="profile-section">
                        <div>
                            
                            <Link to={`/actor/${cast.id}`}><img className="movie-credit-image" src={`${imageUrl}${cast.profile_path}`} alt={"defaultimage"}/></Link>
                        </div>
                        <div>
                        <Link to={`/actor/${cast.id}`}><h3>{cast.name}</h3></Link>
                            <h4>{cast.character}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2>Crew ({crews.length})</h2>
                {crews.map((crew) => (
                    <div className="profile-section" key={crew.id}>
                        <div>
                        <Link to={`/actor/${crew.id}`}><img className="movie-credit-image" src={`${imageUrl}${crew.profile_path}`} alt={"defaultimage"}/></Link>
                        </div>
                        <div>
                            <h3>{crew.name}</h3>
                            <h4>{crew.job}</h4>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default MovieCreditsList;