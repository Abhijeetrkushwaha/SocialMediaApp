import React from 'react';
import Chatapp from '../sample-images/chatapp.png'

export default function Post() {
    return (
        <div className="post">
            <div className="post__user">
                <div className="user__info">
                    <h3>A</h3>
                    <p>Abhijeet Kushwaha</p>
                </div>
                <div className="post__time">
                    <p>2 hours ago</p>
                </div>
            </div>
            <div className="post__image">
                <img src={Chatapp} alt="Chat preview"/>
            </div>
            <div className="post__info">
                <h3>Chat application</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, recusandae.</p>
                <button>view</button>
            </div>
        </div>
    )
}
