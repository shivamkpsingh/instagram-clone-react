import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = () => {

  }

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              className="header__img"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
          <Input
          placeholder="Email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="header__img"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <Button onClick={() => setOpen(true)}>sign up</Button>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imgurl={post.imgurl}
        />
      ))}
    </div>
  );
};

export default App;
