import {MovieVideoType} from "../models/MovieVideos.types";
import ReactPlayer from "react-player";

type ClipVideoProps = {
    video: MovieVideoType
}

const ClipVideo: React.FC<ClipVideoProps> = ({video}) => {    
    const youtubeUrl =`https://www.youtube.com/watch?v=${video.key}`
    return (
        <div>
            <ReactPlayer
                url= {youtubeUrl}
                // playing={true}
                // loop={true}
                volume={0.1}
                // muted={true}
                height={400}
                light={true}
            />
            
        </div>
    );
};

export default ClipVideo;