
import { useState, useContext} from "react";
import { requestToken } from "../api/routes/userLogin";
import { UserContext } from "../providers/AuthProvider";

const LoginPage = () => {

    const { setToken } = useContext(UserContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await requestToken()
        console.log("REQUEST IN HANDLELOGIN", response)
        if(response.success === true) {
            console.log("it got passed:", response.request_token)
            window.localStorage.setItem("localToken", response.request_token)
            setToken(response.request_token)
        } else {
            console.error("REQUEST TOKEN FAILED!!")
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                        placeholder="MovieFan123@gmail.com"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                        placeholder="**********"
                    />
                </div>
                <div>
                    <p>Don't have an account?</p>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;