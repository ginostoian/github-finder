import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    //Instantiate state to hold the fetched data
    const initialState = {
        users: [],
        user: {},
        repos: [],
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

    //Get initial users for testing purposes
    const fetchUser = async (login) => {
        setLoading()

        const res = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                // Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if (res.status === 404) {
            window.location = '/notfound'
        } else {

            const data = await res.json()

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

    }

    // Get user repos
    const fetchUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                // Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await res.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR'
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        fetchUser,
        fetchUsers,
        clearUsers,
        fetchUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext