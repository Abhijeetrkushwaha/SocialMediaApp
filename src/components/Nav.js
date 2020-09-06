import React from 'react'
import ChatLogo from '../sample-images/chatlogo.png'

function Nav() {
    return (
        <div className="nav">
            <div className="nav__info">
                <div className="nav__image">
                    <img src={ChatLogo} alt="ChatLogo"/>
                </div>
                <div className="nav__logout">
                    <p>logout</p>
                </div>
            </div>
        </div>
    )
}

export default Nav