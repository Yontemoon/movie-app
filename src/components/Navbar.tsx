import { Link } from "react-router-dom";
import filmIcon from "../images/filmIcon.svg"
import searchIcon from "../images/search.svg"
import { useState } from "react";
import "../styles/navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const [searchedQuery, setSearchQuery] = useState("")

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if(searchedQuery === "") return
        console.log(searchedQuery)
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
                <button type="submit">
                    <img src={searchIcon}/>
                </button>
            </form>
        </div>
    );
};

export default Navbar;