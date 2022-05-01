import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    //Instantiate state to hold the fetched data
    const initialState = {
        users: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // helper function to set the loading status using the reducer
    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }

    //Get initial users for testing purposes
    const fetchUsers = async (searchText) => {
        setLoading()

        const params = new URLSearchParams({
            q: searchText
        })

        const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                // Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const { items } = await res.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext