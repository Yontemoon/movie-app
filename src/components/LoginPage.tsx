
import { useContext} from "react";
import { requestToken } from "../api/routes/userLogin";
import { UserContext } from "../providers/AuthProvider";

const LoginPage = () => {

    const { setToken } = useContext(UserContext)

    const handleLogin = async () => {
        const response = await requestToken()
        // console.log("REQUEST IN HANDLELOGIN", response)
        if(response.success === true) {
            // console.log("it got passed:", response.request_token)
            window.localStorage.setItem("localToken", response.request_token)
            setToken(response.request_token)
        } else {
            console.error("REQUEST TOKEN FAILED!!")
        }
    }

    return (
        <div>
            <p>You will be leaving this website temporarly.</p>
            <p>To offically log in, you must have an account on themoviedb.org.</p>
            <p>Once you click confirm, you must log in to your themoviedb.org account and approve the authenicaltion request.</p>
            <button onClick={handleLogin}>Confirm</button>
        </div>
    );
};

export default LoginPage;