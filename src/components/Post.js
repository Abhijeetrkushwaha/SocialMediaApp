import React from 'react';
import Chatapp from '../sample-images/chatapp.png'

export default function Post() {
    return (
        <div className="post">
            <h3>Username</h3>
            <div className="post__image">
                <img src={Chatapp} alt=""/>
            </div>
        </div>
    )
}
