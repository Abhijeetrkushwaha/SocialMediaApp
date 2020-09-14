import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from 'firebase'

function ImageUpload({ username }) {

    const [caption, setCaption] = useState('');
    const [des, setDes] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err) => {
                // error function...
                console.log(err);
                alert(err.message);
            },
            () => {
                // complete function...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        username: username,
                        projectName: caption,
                        description: des,
                        imageUrl: url,
                    });
                    setProgress(0);
                    setCaption('');
                    setDes('');
                    setImage(null);
                })
            }
        )
    }

    return (
        <div>
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a project name..." value={caption} onChange={(e) => setCaption(e.target.value)}/>
            <input type="text" placeholder="Enter a description..." value={des} onChange={(e) => setDes(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default ImageUpload
