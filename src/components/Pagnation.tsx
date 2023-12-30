import { useEffect } from "react";
import ReactPaginate from "react-paginate";
// import { Link } from "react-router-dom";
// import imageUrl from '../library/imageUrl';
// import formatDate from "../library/formatDate";
// import defaultImage from "../images/landscape.png"
import "../styles/pagnation.css"
import { getMovieSearch, getPersonSearch } from "../api/routes/searchQuery";
import MovieDetailsType from '../models/MovieDetails.types';
import SearchActorType from '../models/SearchActor.types';

type PagnationType = {
  currentItems: MovieDetailsType[] | SearchActorType[] | null;
  searched: string;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentItems: React.Dispatch<React.SetStateAction<MovieDetailsType[] | SearchActorType[] | null>>;
  currentFilter: string
}

type PageChangeEventType = {
  selected: number;
}

const Pagnation: React.FC <PagnationType> = ({ currentItems, searched, pageCount, setCurrentItems, currentFilter }) => {

    useEffect(() => {
      window.scrollTo(0, 0)
    },[currentItems])

    const handlePageClick = async (event: PageChangeEventType) => {
        // console.log(event.selected)
        if (currentFilter === "movies") {
          const newResults = await getMovieSearch(searched, event.selected + 1)
          setCurrentItems(newResults.results)
        } else {
          const newResults = await getPersonSearch(searched, event.selected + 1)
          setCurrentItems(newResults.results)
        }
      };

    return (
        <div className="pagnation-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            className="react-pagnation"
          />
        </div>
    );
};

export default Pagnation;