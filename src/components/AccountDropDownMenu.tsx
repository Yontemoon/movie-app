import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import downChevron from "../images/chevron-down.svg"

const AccountDropDownMenu = () => {
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem("localAccount")
        window.localStorage.removeItem("localAccessTokenData")
    }

    return (
        <Menu>
            <Menu.Button>{user?.username}<img src={downChevron}/></Menu.Button>
            <Menu.Items className="dropdown-container">
                <Menu.Item>
                    {({ active }) => (
                        <p
                            onClick={() => {
                                navigate("/watchlist")
                            }}
                        >
                            Watchlist
                            
                        </p>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <p
                            onClick={() => {
                                navigate("/favorite")
                            }}
                        >
                            Favorites
                        </p>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <p
                            onClick={handleLogout}
                        >
                            Logout
                        </p>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default AccountDropDownMenu;