import { ImageType } from '../models/MovieImages.types';
import Carousel from './Carousel';
import {MovieVideoType} from '../models/MovieVideos.types';
import expand from "../images/maximize-2.svg"
import "../styles/downloadableImages.css"

type DownloadableImagesTypes = {
    movieImages: ImageType[];
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageType | MovieVideoType | null>>;
}

const DownloadableImages: React.FC<DownloadableImagesTypes> = ({movieImages, setOpenModel, setSelectedImage}) => {
    return (
        <div id="downloabableImages">
        <Carousel numberPerSlide={5}>
            {movieImages.map((image: ImageType, index: number) => (
                <div key={index} className="section">
                    <img className="image" src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt=""/>
                    <img 
                        src={expand}
                        alt={expand}
                        className="expand-button"
                        onClick={() => {
                            setOpenModel(true)
                            setSelectedImage(image)
                        }}
                        
                    />
                </div>
            ))}
        </Carousel>
        </div>
    );
};

export default DownloadableImages;