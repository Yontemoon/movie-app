import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carousel.css"

type CarouselProps = {
    numberPerSlide: number
    autoplay?: boolean;
    infinite?: boolean;
    fade?: boolean;
    dots?: boolean;
    variableWidth?: boolean;
    children: React.ReactNode

}

const Carousel: React.FC<CarouselProps>= ({numberPerSlide, autoplay = false, infinite = false, fade = false, dots = false, variableWidth = false, children}) => {

    const settings = {
        arrows: true,
        dots: dots,
        infinite: infinite,
        speed: 500,
        slidesToShow: numberPerSlide,
        slidesToScroll: numberPerSlide,
        initialSlide: 0,
        autoplay: autoplay,
        fade: fade,
        autoplaySpeed: 10000,
        variableWidth: variableWidth,
    }

    return (
        <Slider {...settings} className="carousel-body">
            {children}
        </Slider>
    );
};

export default Carousel;