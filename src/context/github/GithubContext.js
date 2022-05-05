import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
    //Instantiate state to hold the fetched data
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext