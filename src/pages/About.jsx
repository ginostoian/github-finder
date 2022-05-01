/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

function About() {
    return (
        <>
            <h1 className='text-6xl mb-4'>Github Finder</h1>
            <p className='mb-4 text-lg font-light text-white'>
                A React app to search GitHub profiles and see profile details. This
                project has been created during my journey to learn React. See this and more projects on
                <strong className='text-xl'>
                    <a target='_blank' href='https://ginostoian.com' rel="noopener"> my portfolio</a>
                </strong>
                .
            </p>
            <p className='text-lg text-gray-400'>
                Version <span className='text-white'>1.0.0</span>
            </p>
            <p className='text-lg text-gray-400'>
                Created By: {' '}
                <a className='text-white' href='https://ginostoian.com' target='_blank' rel='noopener'>
                    Gino Stoian
                </a>
            </p>
        </>
    )
}

export default About
