import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './ImageUpload.css';
import { storage, db } from './firebase'
import firebase from "firebase";

const ImageUpload = (username) => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    // const[url,setUrl]=useState('')
    const [progress, setProgress] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleupload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside the databse
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgurl: url,
                            username: username,
                        })
                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
        )
    }

    return (
        <div>
            <progress value={progress} max="100"></progress>
            <input type="text" placeholder="Enter a Caption" onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button className="imageupload__button" onClick={handleupload}>upload</Button>
        </div>
    )
}

export default ImageUpload;
