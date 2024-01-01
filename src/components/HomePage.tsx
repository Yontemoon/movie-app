import { useEffect } from 'react'

import { useLoaderData } from 'react-router-dom';
import HomePageSlider from './HomePageSlider';
import { HomePageSliderType } from '../models/HomePageSlider.type';
import HomePagePopularSlider from './HomePagePopularSlider';
import MovieDetailsType from '../models/MovieDetails.types';
import "../styles/homePage.css"




type LoaderData = {
    nowPlaying: HomePageSliderType[];
    upComing: HomePageSliderType[];
    topRated: HomePageSliderType[];
    popular: MovieDetailsType[]
};
  

const HomePage = () => {
    const {nowPlaying, upComing, topRated, popular}: LoaderData = useLoaderData() as LoaderData

    useEffect(() => {
        window.scrollTo(0, 0)
        
    }, [])

    return (
        <div>
            <HomePagePopularSlider movieData={popular}/>
            <div>
                <h1 className="homepage-container">Now Playing</h1>
                <HomePageSlider movieData={nowPlaying}/>
            </div>
            <div>
                <h1 className="homepage-container">Up Coming</h1>
                <HomePageSlider movieData={upComing}/>
            </div>
            <div>
                <h1 className="homepage-container">Top Rated</h1>
                <HomePageSlider movieData={topRated}/>
            </div>

        </div>
    );
};

export default HomePage;