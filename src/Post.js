import React from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "./firebase";
import firebase  from "firebase";

const Post = ({ postId,user, username, caption, imageUrl }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    useEffect(() => {
        let unsunscribe;
        if (postId) {
            unsunscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsunscribe();
        };
    }, [postId]);

    const postCOmment = (event) => {
          event.preventDefault();
          db.collection("posts").doc(postId).collection("comments").add({
              text:comment,
              username:user.displayName,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
          })
          setComment('')
    }


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
            <h4 className="post__text">
                <strong>{username} </strong>
                {caption}
            </h4>

            <div className="post__comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                     ) )
                }
            </div>

           {
               user && (
                <form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postCOmment}
                >
                    Post
                </button>
            </form>
               )
           }
        </div>
    );
};

export default Post;
