import { Link } from "react-router-dom";
import filmIcon from "../images/filmIcon.svg"
import searchIcon from "../images/search.svg"
import { useState, FormEvent } from "react";
import "../styles/navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const [searchedQuery, setSearchQuery] = useState("")

    const handleSearch = (event: FormEvent<HTMLFormElement>): void =>  {
        event.preventDefault();
        if(searchedQuery === "") return
        navigate(`/query/${searchedQuery}`)


        setSearchQuery("")
    }

    return (
        <div id="navbar">
            <Link to="/">
                <img src={filmIcon}/>
            </Link>
            <form onSubmit={handleSearch} className="search">
                <input 
                    placeholder="Quick Search"
                    type='text'
                    value={searchedQuery}
                    onChange={({target}) => setSearchQuery(target.value)}
                />
                <button type="submit" className="search-icon-button">
                    <img src={searchIcon} className="search-icon"/>
                </button>
            </form>
        </div>
    );
};

export default Navbar;