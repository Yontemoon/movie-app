import { useState, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom'
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
import WatchlistType from './models/Watchlist.types'
import MovieCreditsList from './components/MovieCreditsList'
import ActorDetails from './components/ActorDetails'
import ActorMovieCreditsTypes from './models/ActorMovieCredits.types'
import ActorDetailsTypes from './models/ActorDetails.types'
import SearchQueryPage from './components/SearchQueryPage'
import { getMovieSearch, getPersonSearch } from './api/routes/searchQuery'
import SearchActortype from './models/SearchActor.types'
import Spinner from './components/Spinner'
import LoginPage from './components/LoginPage'
import LoginApproved from './components/LoginApproved'
import WatchlistPage from './components/WatchlistPage'
import FavoritesPage from './components/FavoritesPage'
import { getWatchlist } from './api/routes/watchlistDetails'
import { useContext } from 'react'
import { UserContext } from './providers/AuthProvider'


function App() {

  const [loading, setLoading] = useState(true);
  const {accessTokenData, user} = useContext(UserContext)

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: "/",
          loader: async () => {
            try {
              const [nowPlaying, upComing, topRated, popular] = await Promise.all([
                getNowPlaying(),
                getUpComing(),
                getTopRated(),
                getPopular()
              ]);

              const nowPlayingTyped: HomePageSliderType[] = nowPlaying;
              const upComingTyped: HomePageSliderType[] = upComing;
              const topRatedTyped: HomePageSliderType[] = topRated;
              const popularTyped: HomePageSliderType[] = popular;

              return { nowPlaying: nowPlayingTyped, upComing: upComingTyped, topRated: topRatedTyped, popular: popularTyped };

            } catch (error) {
              console.error("Error fetching data:", error);
            } finally {
              setLoading(false);
            }
          },

          element:<HomePage/>
        },
        {
          path:"/login",
          element: <LoginPage/>
        },
        {
          path:"/approved",
          element: <LoginApproved/>
        },
        {
          path:"/details/:id",
          loader: async ({params}) => {
            try {
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
  
              return defer({
                movieDetails: movieDetailsTyped, 
                movieCredits: movieCreditsTyped, 
                movieImages: movieImagesTyped, 
                movieVideos: movieVideosTyped,
                movieRecommendations: movieRecommendationsTyped,
                totalMovieRecommendationsPages: totalMovieRecommendationsPagesTyped
              })
            } catch (error) {
              console.error("Error fetching data:", error);
            } finally {
              setLoading(false);
            }

          },
          element: <MovieDetails setLoading={setLoading} loading={loading}/>
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
        }, 
        {
          path:"/watchlist",
          loader: async () => {
            if (accessTokenData && user) {
              const watchlist: WatchlistType = await getWatchlist(accessTokenData.access_token, user.id, 1)
              return watchlist
            } 
          },
          element:<WatchlistPage/>
        },
        {
          path:"/favorite",
          element:<FavoritesPage/>
        }

      ]
    }
  ])

  return (
    <div id="main-container">
      <Suspense fallback={<Spinner/>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App
