const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//Get initial users for testing purposes
export const fetchUsers = async (searchText) => {

    const params = new URLSearchParams({
        q: searchText
    })

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const { items } = await res.json()

    return items
}

//Get specific user
export const fetchUser = async (login) => {

    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if (res.status === 404) {
        window.location = '/notfound'
    } else {
        const data = await res.json()

        return data
    }

}

// Get user repos
export const fetchUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 20
    })

    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
            // Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const data = await res.json()

    return data
}