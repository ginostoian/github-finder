import React from 'react'

import UserSearch from '../components/users/UserSearch'
import UserResults from '../components/users/UserResults'

function Home() {
    return (
        <>
            <div class="mockup-code mb-32 max-w-lg mx-auto md:mx-0">
                <pre data-prefix="$"><code>search for github users</code></pre>
                <pre data-prefix=">" class="text-warning"><code>fetching data...</code></pre>
                <pre data-prefix=">" class="text-success"><code>Happy stalking!</code></pre>
            </div>
            <UserSearch />
            <UserResults />
        </>
    )
}

export default Home
