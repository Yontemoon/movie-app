
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import ListByYears from './components/ListByYears'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import { HomePageSliderType } from './models/HomePageSlider.type'
import MovieDetails from './components/MovieDetails'
import { getMovieDetails, getMovieCredits, getMovieImages, getMovieVideos, getMovieRecommendations } from './api/routes/movieDetails'
import { getNowPlaying, getUpComing, getTopRated, getPopular } from './api/routes/homePage'
import { getActorDetails, getActorMovieCredits } from './api/routes/actorDetails'
import MovieDetailsType from './models/MovieDetails.types'
import MovieCreditsType from './models/MovieCredits.types'
import MovieImagesType from './models/MovieImages.types'
import MovieVideoTypes from './models/MovieVideos.types'
import MovieCreditsList from './components/MovieCreditsList'
import ActorDetails from './components/ActorDetails'
import ActorMovieCreditsTypes from './models/ActorMovieCredits.types'
import ActorDetailsTypes from './models/ActorDetails.types'
import SearchQueryPage from './components/SearchQueryPage'
import { getMovieSearch, getPersonSearch } from './api/routes/searchQuery'
import SearchActortype from './models/SearchActor.types'


function App() {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: "/",
          loader: async () => {
            const [nowPlaying, upComing, topRated, popular] = await Promise.all([
              getNowPlaying(),
              getUpComing(),
              getTopRated(),
              getPopular()
            ])

            const nowPlayingTyped: HomePageSliderType[] = nowPlaying;
            const upComingTyped: HomePageSliderType[] = upComing;
            const topRatedTyped: HomePageSliderType[] = topRated;
            const popularTyped: HomePageSliderType[] = popular

            return { nowPlaying: nowPlayingTyped, upComing: upComingTyped, topRated: topRatedTyped, popular: popularTyped };
          },

          element:<HomePage/>
        },
        // {
        //   path:"/year/:id",
        //   loader: async ({params}) => {
        //     const id = Number(params.id)
        //     const results = await getMovieByYear(1, id)
        //     return results
        //   }, 
        //   element: <ListByYears/>
        // },
        {
          path:"/details/:id",
          loader: async ({params}) => {
            const id = Number(params.id)
            const [movieDetails, movieCredits, movieImages, movieVideos, movieRecommendations] = await Promise.all([
              getMovieDetails(id),
              getMovieCredits(id),
              getMovieImages(id),
              getMovieVideos(id),
              getMovieRecommendations(id, 1)
            ])

            const movieDetailsTyped: MovieDetailsType = movieDetails
            const movieCreditsTyped: MovieCreditsType = movieCredits
            const movieImagesTyped: MovieImagesType = movieImages
            const movieVideosTyped: MovieVideoTypes = movieVideos
            const movieRecommendationsTyped: MovieDetailsType[] = movieRecommendations.results
            const totalMovieRecommendationsPagesTyped: number = movieRecommendations.total_pages

            return {
              movieDetails: movieDetailsTyped, 
              movieCredits: movieCreditsTyped, 
              movieImages: movieImagesTyped, 
              movieVideos: movieVideosTyped,
              movieRecommendations: movieRecommendationsTyped,
              totalMovieRecommendationsPages: totalMovieRecommendationsPagesTyped
            }
          },
          element: <MovieDetails/>
        },
        {
          path:"/details/:id/cast",
          loader: async ({params}) => {
            const id = Number(params.id)
            const credits: MovieCreditsType = await getMovieCredits(id);
            return credits
          },
          element: <MovieCreditsList/>,
        },
        {
          path:"/actor/:id",
          loader: async ({params}) => {
            const id = Number(params.id)
            const [actorDetails, actorCredits] = await Promise.all([
              getActorDetails(id),
              getActorMovieCredits(id)
            ])

            const actorDetailsTyped: ActorDetailsTypes = actorDetails
            const actorCreditTyped: ActorMovieCreditsTypes = actorCredits
            return {actorDetails: actorDetailsTyped, actorMovieCredits: actorCreditTyped}
          },
          element: <ActorDetails/>
        },
        {
          path:"/query/:searched",
          loader: async ({params}) => {
            const searched = params.searched !== undefined && params.searched
          
            if (typeof searched === "string") {
              const [searchedMovie, searchedPerson] = await Promise.all([
                getMovieSearch(searched, 1),
                getPersonSearch(searched, 1)
            ])

            const movieSearchedTyped: MovieDetailsType[] = searchedMovie.results
            const personSearchedTyped: SearchActortype[] = searchedPerson.results
            const movieSearchedTotalResultsTyped: number = searchedMovie.total_results
            const personSearchedTotalResultsTyped: number = searchedPerson.total_results


            return {
              searchedMovies: movieSearchedTyped, 
              searchedPersons: personSearchedTyped, 
              movieSearchedTotalResults: movieSearchedTotalResultsTyped,
              personSearchedTotalResults: personSearchedTotalResultsTyped,
              searched
            }
            } else {
              return { searchedMovie: [], searchedPerson: [] };
            }
            
          },
          element: <SearchQueryPage/>
        }

      ]
    }
  ])

  return (
    <div id="main-container">
      <RouterProvider 
        router={router} 
      />
    </div>
  )
}

export default App
