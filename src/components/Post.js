import React from 'react';
// import Chatapp from '../sample-images/chatapp.png';
import Avatar from '@material-ui/core/Avatar'


export default function Post({username, projectName, description, imageUrl}) {
    return (
        <div className="post">
            <div className="post__user">
                <div className="user__info">
                    <Avatar className="info__img" alt={username} src='/img' />
                    <p>{username}</p>
                </div>
                <div className="post__time">
                    <p>2 hours ago</p>
                </div>
            </div>
            <div className="post__image">
                <img src={imageUrl} alt="Chat preview"/>
            </div>
            <div className="post__info">
                <h3>{projectName}</h3>
                <p>{description}</p>
                <button>view</button>
            </div>
        </div>
    )
}
