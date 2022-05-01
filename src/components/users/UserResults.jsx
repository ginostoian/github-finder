import { useState, useEffect } from "react"

import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"

function UserResults() {
    //Instantiate state to hold the fetched data
    const [users, setUsers] = useState([])
    //Instantiate state to show a loader while fetching data
    const [isLoading, setIsLoading] = useState(true)

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })

        const data = await res.json()
        setUsers(data)
        setIsLoading(false)
    }

    // run the fetchUsers function to get the data once the page is loaded
    useEffect(() => {
        fetchUsers()
    }, [])

    if (!isLoading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => {
                    return (
                        <UserItem key={user.id} user={user} />
                    )
                })}
            </div>
        )
    } else {
        return <Spinner />
    }

}

export default UserResults
