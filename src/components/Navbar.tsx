import { Link } from "react-router-dom";
import filmIcon from "../images/filmIcon.svg"
import searchIcon from "../images/search.svg"
import { useState, FormEvent, useContext } from "react";
import "../styles/navbar.css"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/AuthProvider";


const Navbar = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const [searchedQuery, setSearchQuery] = useState("")

    const handleSearch = (event: FormEvent<HTMLFormElement>): void =>  {
        event.preventDefault();
        if(searchedQuery === "") return
        navigate(`/query/${searchedQuery}`)


        setSearchQuery("")
        
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem("localAccount")
    }

    return (
        <div id="navbar">
            <Link to="/">
                <img src={filmIcon}/>
            </Link>
            <div className="right-section">
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
                
                    {user && <p>{user.username}</p> }
                    {user ? 
                        <button onClick={handleLogout}>
                            Logout
                        </button> : 
                        <Link to="/login">
                            <p>Login</p>
                        </Link>}
                

            </div>

        </div>
    );
};

export default Navbar;