
import WrapMovies from './WrapMovies';
import { useLoaderData } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../providers/AuthProvider';
import { getWatchlist } from '../api/routes/watchlistDetails';
import WatchlistType from '../models/Watchlist.types';


const WatchlistPage = () => {

    const watchlist = useLoaderData() as WatchlistType;
    console.log(watchlist)
    const { user, accessTokenData } = useContext(UserContext)
    console.log(watchlist)
    const [currentWatchlist, setCurrentWatchlist] = useState(watchlist.results)
    const totalPages = watchlist.total_pages
    const currentPage = useRef(1)
    console.log("CURRENTPAGE:", currentPage)

    const handleShowMore = async () => {
        if (accessTokenData) {
            currentPage.current++
            const newWatchlist = (await getWatchlist(accessTokenData.access_token, accessTokenData.account_id, currentPage.current)).results
            setCurrentWatchlist(currentWatchlist.concat(newWatchlist))
        }

    }

    return (
        <div>
        {user ?
            <div>
                <h1>Your Watchlist</h1>
                <WrapMovies movies={currentWatchlist}/>
                {currentPage.current < totalPages && <button onClick={handleShowMore}>Show More...</button>}
            </div> :
        <p>You are currently not logged in...</p>
    }
        </div>
    );
};

export default WatchlistPage;