type ImageProp = {
    imageUrl: string;
    children?: React.ReactNode;
}

const Image: React.FC<ImageProp> = ({imageUrl, children}) => {
    return (
        <div className="image-container">
            <img className="popular-image" src={`https://image.tmdb.org/t/p/original${imageUrl}`} alt="testing"/>
            <div className="overlay"></div>
            {children}
        </div>
    );
};

export default Image;