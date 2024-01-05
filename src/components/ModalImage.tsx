
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {MovieVideoType} from "../models/MovieVideos.types";
import "../styles/ModalImage.css"
import { ImageType } from "../models/MovieImages.types";
import VideoPlayer from "./TrailerVideo";
import closeButton from "../images/x.svg";
import downloadIcon from "../images/download.svg"
import DialogModal from "./DialogModal";


type ModelImage = {
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    openModel: boolean;
    poster: ImageType | MovieVideoType;
}

const ModalImage: React.FC<ModelImage> = ({setOpenModel, openModel, poster}) => {

    // const handleDownloadImage = () => {
    //     const imageUrl = isImageType(poster)
    //   ? `https://image.tmdb.org/t/p/original${poster.file_path}`
    //   : '';

    //   const link = document.createElement('a');
    //   link.href = imageUrl;
    //   link.href = imageUrl
    //   link.download = `download_image`;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }   
    const downloadFile = async () => {
        const imageUrl = isImageType(poster)
        ? `https://image.tmdb.org/t/p/original${poster.file_path}`
        : ""; 
    
        if (imageUrl) {
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();
              console.log(blob)
        
              // Create a link element
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'downloaded_image';
        
              // Simulate a click on the link to trigger the download
              document.body.appendChild(link);
              link.click();
        
              // Clean up: remove the link from the DOM
              document.body.removeChild(link);
            } catch (error) {
              console.error('Error downloading image:', error);
            }
          }
      }

    return (
        <DialogModal open={openModel}>
            <img 
                className="close-button" 
                src={closeButton} 
                alt="close"
                onClick={() => setOpenModel(false)}
            />
            <div className="image-section">
                {isImageType (poster) ? <img className="image-poster" src={`https://image.tmdb.org/t/p/original${poster.file_path}`} alt="poster"/> : <VideoPlayer video={poster}/>}
                {isImageType (poster) && <img className="download-button" src={downloadIcon} alt="download" onClick={downloadFile}/>}
            </div>

        </DialogModal>
    );
};

const isImageType = (poster: ImageType | MovieVideoType): poster is ImageType => {
    return (poster as ImageType).file_path !== undefined;
}

export default ModalImage;