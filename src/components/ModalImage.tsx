
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {MovieVideoType} from "../models/MovieVideos.types";
import "../styles/ModalImage.css"
import { ImageType } from "../models/MovieImages.types";
import VideoPlayer from "./TrailerVideo";


type ModelImage = {
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    openModel: boolean;
    poster: ImageType | MovieVideoType;
}

const ModalImage: React.FC<ModelImage> = ({setOpenModel, openModel, poster}) => {
    return (
        <Transition
            show={openModel}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog className="dialog" open={openModel} onClose={() => {}}>
                <div className="backdrop"/>
                    <div>
                        <div className="container">
                            <Dialog.Panel className="image-section">
                                {isImageType (poster) ? <img src={`https://image.tmdb.org/t/p/original${poster.file_path}`} alt=""/> : <VideoPlayer video={poster}/>}
                            </Dialog.Panel>
                            <div>
                                {isImageType (poster) && <button>Download</button>}
                                <button onClick={() => setOpenModel(false)}>Close</button>
                            </div>
                        </div>
                    </div>
            </Dialog>
        </Transition>
    );
};

const isImageType = (poster: ImageType | MovieVideoType): poster is ImageType => {
    return (poster as ImageType).file_path !== undefined;
}

export default ModalImage;