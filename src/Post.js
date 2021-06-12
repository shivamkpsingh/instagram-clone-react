import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar';

const Post = ({username,caption,imageUrl}) => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="https://instagram.fknu1-2.fna.fbcdn.net/v/t51.2885-19/s320x320/68721541_378024712876222_6419730979321020416_n.jpg?tp=1&_nc_ht=instagram.fknu1-2.fna.fbcdn.net&_nc_ohc=COktOJrrYzoAX_R9gxF&edm=ABfd0MgBAAAA&ccb=7-4&oh=8f486beb534af2fe54da27c3b8b4518c&oe=60BBF06D&_nc_sid=7bff83"
                />
                <h3>{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt="" />
            <h4 className="post__text">  <strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post;
