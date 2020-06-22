import React, { useState } from 'react'
import Login from './Login'

function LandingPage (props) {
    const [showLogin, setShowLogin] = useState()

    let button
    if (showLogin) {
        button = 
        <button href="/" onClick={() => setShowLogin(!showLogin)} className="bg-black block lg:inline-block lg:mt-12 text-white hover:bg-transparent hover:border-transparent hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider">
            sign up
        </button>
    }

    return (
        <div className="inline-flex h-full w-screen px-48 pt-40 items-center justify-between">
            <div className="block h-full w-1/2">
                <h1 className="font-sofia w-full font-bold text-6xl">
                    MEET
                    &#x26;
                    DISCOVER
                </h1>
                <h4 className="font-sofia font-light text-xl w-full pr-20">
                    Rendezvous provides an efficient method to meet up with 
                    friends, removing the unnecessary clutter when organising meetups.
                </h4>
                { button }
            </div>
            <Login history={props.history}/>
        </div>
    )
}

export default LandingPage