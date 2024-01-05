import { url, options, apiKey } from "../theMovieDb";


// V3 REQUEST TOKEN
// export const requestToken = async () => {
//     try {
//         const response = await fetch(`${url}/authentication/token/new`, options);
//         const data = await response.json()
//         console.log("REQUEST TOKEN", data)
//         return data;
//     } catch (error) {
//         console.error("Request Token:", error)
//         throw error
//     }
// }

// V4 REQUEST TOKEN
export const requestToken = async () => {
    const url = 'https://api.themoviedb.org/4/auth/request_token';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body:JSON.stringify({
            redirect_to: `http://localhost:5173/approved/` 
        })
    };
    try {
        const response = await fetch(url,options)
        const data = await response.json();
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`;
        return data
    } catch (error) {
        console.error("Request Token Error:", error)
        throw error
    }
}

// V3 ACCESS TOKEN
// export const getAccessToken = async (requestToken: string) => {
//     try {
//         const response = await fetch(`${url}/authentication/session/new`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${apiKey}`

//             },
//             body: JSON.stringify({
//                 "request_token": requestToken,
//             })
//         });
//         const data = await response.json()
//         console.log("SESSION ID", data)
//         return data;
//     } catch (error) {
//         console.error("Error creating Session:", error)
//         throw error
//     }
// }

// V4 ACCESS TOKEN 
export const getAccessToken = async (requestToken: string) => {
    const url = 'https://api.themoviedb.org/4/auth/access_token';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
        request_token: `${requestToken}`
        })
    };
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch(error) {
        console.error("ACCESS TOKEN ERROR", error)
        throw error;
    } 
}

export const getAccountInfo = async (AccountID: string, accessKey:string) => {
    const accountInfoOptions = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessKey}`,
        }

    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${AccountID}`, accountInfoOptions);
        const data = await response.json()
        // console.log("ACCOUNT DATA", data)
        return data
    } catch (error) {
        console.error("Error getting account info:", error)
    }
}

