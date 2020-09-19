import React from 'react';
// import Chatapp from '../sample-images/chatapp.png';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'


export default function Post({username, description, imageUrl, timestamp}) {
    // console.log(timestamp);
    return (
        <div className="post">
            <div className="post__user">
                <div className="user__info">
                    <Avatar className="info__img" alt={username} src='/img' />
                    <p>{username}</p>
                </div>
                <div className="post__time">
                <p>{ timestamp && moment(timestamp.toDate()).calendar()}</p>
                </div>
            </div>
            <div className="post__image">
                {
                    imageUrl && <img src={imageUrl} alt="Technical issue or slow net speed"/>
                }
            </div>
            <div className="post__info">
                {/* <p>{username}</p>
                <p>{description}</p> */}
                <h3>{username}: <span className="light-col">{description}</span></h3>
            </div>
        </div>
    )
}
