import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from 'firebase'

function ImageUpload({ user }) {

    const [caption, setCaption] = useState('');
    const [des, setDes] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null)
    const [waitSignal, setWaitSignal] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if(image && des && caption){
            setWaitSignal('Just a second post is uploading')
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
                        username: user.displayName,
                        projectName: caption,
                        description: des,
                        imageUrl: url,
                    });
                    setProgress(0);
                    setCaption('');
                    setDes('');
                    setImage(null);
                    setWaitSignal('')
                })
            }
        )
        } else {
            alert('please fill all required field')
        }
    }

    return (
        <div>
            <form>
                <div className="form">
                    <div className="form-progress">
                        <progress value={progress} max="100" /> <br/>
                        <center>
                        {waitSignal}
                        </center>
                    </div>
                    <div className="input-fields">
                        <input type="text" placeholder="Enter a project name..." value={caption} onChange={(e) => setCaption(e.target.value)}/>
                        <input type="text" placeholder="Enter a description..." value={des} onChange={(e) => setDes(e.target.value)}/> <br/>
                        <input type="file" onChange={handleChange}/>
                    </div>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </form>
        </div>
    )
}

export default ImageUpload
