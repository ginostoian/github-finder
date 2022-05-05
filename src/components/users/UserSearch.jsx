import { useState, useContext } from "react"

import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"
import { fetchUsers } from "../../context/github/GithubActions"

function UserSearch() {
    const [searchText, setSearchText] = useState('')
    const { users, dispatch } = useContext(GithubContext)
    const { setAlert } = useContext(AlertContext)

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (searchText === '') {
            setAlert('Please enter something in the search bar!', 'error')
        } else {
            dispatch({ type: 'SET_LOADING' })
            const users = await fetchUsers(searchText)
            dispatch({ type: 'GET_USERS', payload: users })

            setSearchText('')
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" placeholder="search for users" value={searchText} onChange={handleChange} />
                            <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
                        </div>
                    </div>
                </form>
            </div>

            {
                users.length > 0 && (
                    <div>
                        <button onClick={() => dispatch({ type: 'CLEAR' })} className="btn btn-ghost btn-lg">
                            Clear
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default UserSearch
