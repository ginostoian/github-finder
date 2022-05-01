import { useEffect } from "react"

function UserResults() {

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })

        const data = await res.json()
        console.log(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            user results
        </div>
    )
}

export default UserResults
