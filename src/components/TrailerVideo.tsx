import {MovieVideoType} from "../models/MovieVideos.types";
import YouTube, { YouTubeProps } from "react-youtube";

type VideoPlayerProps = {
    video: MovieVideoType
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({video}) => {    
    const opts: YouTubeProps["opts"] = {
        height: '500',
        width: '800',
        playerVars: {
            autoplay: 1,
            mute: 1,
            quality: "highres",
            loop: 1,
        }
    }
    return (
        <div>
            <YouTube
                videoId={video.key}
                id={video.id}
                opts={opts}
            />
        </div>
    );
};

export default VideoPlayer;