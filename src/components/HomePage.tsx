import { useEffect, useState } from 'react'
import createListOfYears from '../library/createListOfYears';
import { useNavigate, useLoaderData } from 'react-router-dom';
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
    console.log(nowPlaying)
    const latestYear = 2023;
    const oldestYear = 1940;
    const navigate = useNavigate()
    const [listOfYears, setListOfYears] = useState<number[] | null>(null) 

    const handleClick = (year: number) => {
        navigate(`/year/${year}`)
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        const completeList: number[] = createListOfYears(latestYear, oldestYear)
        setListOfYears(completeList)
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
            {listOfYears?.map((year, index) => {
                return (
                    <button onClick={() => handleClick(year)}key={index}>
                        {year}
                    </button>
                )
            })}
        </div>
    );
};

export default HomePage;