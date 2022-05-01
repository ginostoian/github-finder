import { createContext, useState } from "react";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    //Instantiate state to hold the fetched data
    const [users, setUsers] = useState([])
    //Instantiate state to show a loader while fetching data
    const [isLoading, setIsLoading] = useState(true)

    const fetchUsers = async () => {
        const res = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                // Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await res.json()
        setUsers(data)
        setIsLoading(false)
    }

    return <GithubContext.Provider value={{
        users,
        isLoading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext