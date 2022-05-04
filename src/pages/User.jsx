import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import GithubContext from "../context/github/GithubContext"

function User() {
    const { fetchUser, user } = useContext(GithubContext)
    const params = useParams()

    useEffect(() => {
        fetchUser(params.login)
    }, [])

    return (
        <div>
            {user.login}
        </div>
    )
}

export default User
