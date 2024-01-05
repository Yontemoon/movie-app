import { useEffect, useContext } from 'react';
// import { getSessionId, getAccountInfo } from '../api/routes/userLogin';
import { UserContext } from '../providers/AuthProvider';
import { getAccessToken, getAccountInfo, } from '../api/routes/userLogin';


const LoginApproved = () => {
    // const location = useLocation()
    const {setToken, token, setAccessTokenData, accessTokenData, setUser, user} = useContext(UserContext)



 useEffect(() => {
  const fetchAccessToken = async () => {
    const localToken = window.localStorage.getItem("localToken")
    // console.log("token,", localToken)
    if(localToken) {
      const accessTokenResponse = await getAccessToken(localToken)
      console.log(accessTokenResponse)
      const accountInformation = await getAccountInfo(accessTokenResponse.account_id, accessTokenResponse.access_token)
      setUser(accountInformation)
      window.localStorage.setItem("localAccount", JSON.stringify(accountInformation))
      console.log("ACCESS TOKEN RESPONSE:", accessTokenResponse)
      console.log("ACCOUNT INFO:", accountInformation)
      setAccessTokenData(accessTokenResponse)
  
    }
    setToken(localToken)
    window.localStorage.removeItem("localToken")
  }
  fetchAccessToken()


 }, [token])


    return (
        <div>
            APPROVED 
            <p>Request Token: {token}</p>
            <p>Account ID: {accessTokenData?.account_id}</p>
            <p>USERNAME: {user?.username}</p>
        </div>
    );
};

export default LoginApproved;