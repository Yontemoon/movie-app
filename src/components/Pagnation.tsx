import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
// import { Link } from "react-router-dom";
// import imageUrl from '../library/imageUrl';
// import formatDate from "../library/formatDate";
// import defaultImage from "../images/landscape.png"
import "../styles/pagnation.css"
import { getMovieSearch, getPersonSearch } from "../api/routes/searchQuery";
import MovieDetailsType from '../models/MovieDetails.types';
import SearchActortype from '../models/SearchActor.types';

type PagnationType = {
  currentItems: MovieDetailsType[] | SearchActortype[] | null;
  searched: string;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentItems: React.Dispatch<React.SetStateAction<MovieDetailsType[] | SearchActortype[] | null>>;
  currentFilter: string
}

const Pagnation: React.FC <PagnationType> = ({ currentItems, searched, pageCount, setCurrentItems, currentFilter }) => {

    useEffect(() => {
      window.scrollTo(0, 0)
    },[currentItems])

    const handlePageClick = async (event) => {
        console.log(event.selected)
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
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
    );
};

export default Pagnation;