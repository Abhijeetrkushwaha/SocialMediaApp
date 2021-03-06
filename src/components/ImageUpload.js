import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from 'firebase'

function ImageUpload({ user }) {

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
        let randomNo = Math.random()
        if(image && des){
            setWaitSignal('Just a second post is uploading')
            const uploadTask = storage.ref(`images/${randomNo}`).put(image)

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
                .child(`${randomNo}`)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        username: user.displayName,
                        description: des,
                        imageUrl: url,
                    });
                    setProgress(0);
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
                   <div className="input-fields">
                   <progress value={progress} max="100" />
                    <div className="orange">
                    {waitSignal}
                    </div>
                        <input type="file" onChange={handleChange}/>
                    <input type="text" placeholder="Enter a Caption..." value={des} onChange={(e) => setDes(e.target.value)}/>
                   </div>
                   <div className="btn-upload">
                   <button onClick={handleUpload}>Upload</button>
                   </div>
                    
                </div>
            </form>
        </div>
    )
}

export default ImageUpload
