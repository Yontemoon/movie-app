import { createContext, useEffect, useState, ReactNode } from "react";
import UserType from "../models/User.types";
import IdlePrompt from "../components/IdlePrompt";

// type TokenType = {
//     request_token: string;
//     status_code: number;
//     status_message: string;
//     success: boolean;
// }
type AccessTokenDataType = {
    access_token: string; 
    account_id: number;
    status_code: number;
    status_message: string;
    success: boolean;
}

type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>
    accessTokenData: AccessTokenDataType | null;
    setAccessTokenData: React.Dispatch<React.SetStateAction<AccessTokenDataType | null>>
}

type AuthProviderProps = {
    children: ReactNode
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [ user, setUser ] = useState<UserType | null>(null)
    const [ token, setToken ] = useState<string | null>(null) 
    const [ accessTokenData, setAccessTokenData ] = useState<AccessTokenDataType | null>(null)

    useEffect(() => {
        
        const loggedUserJSON = window.localStorage.getItem("localAccount")
        if (loggedUserJSON) {
            const parseUser = JSON.parse(loggedUserJSON);
            console.log(parseUser);
            const localAccessTokenData = window.localStorage.getItem("localAccessTokenData")
            if (localAccessTokenData) {
                const parseTokenData = JSON.parse(localAccessTokenData)
                console.log("LOCALACCESSTOKEN", parseTokenData)
                setAccessTokenData(parseTokenData)
            }
            setUser(parseUser);
        }

    },[])

    return (
        <UserContext.Provider value={{user, setUser, token, setToken, accessTokenData, setAccessTokenData}}>
            {user && <IdlePrompt/>}
            {children}
        </UserContext.Provider>
    );
};

export default AuthProvider;