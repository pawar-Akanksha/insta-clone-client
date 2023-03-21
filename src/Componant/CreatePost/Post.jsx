import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainHeader } from "../../Header/Header";
import './Post.css'
// const API = 'http://localhost:9000'
const API = 'https://instacloneserver-yk4r.onrender.com'

export default function CreatePost() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [description, setDesc] = useState("");
    // console.log(image, description)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        await fetch(`${API}/posts`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('token'),
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            navigate("/posts")
            }).catch(e => {
            console.log("err>>>> " + e);
            });

    }

    return (
        <>
        <div className="create-post-container">
            <MainHeader/>
            <div className="create-post-box">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="input-file" type="file" id="file" onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="file">Browse</label>
                <br />
                <textarea className="expanding-text-input" placeholder="Enter description here"
                onChange={(e) => setDesc(e.target.value)} ></textarea>
                <button type="submit">Post</button>
            </form>
            </div>
        </div>
        </>
    )
}