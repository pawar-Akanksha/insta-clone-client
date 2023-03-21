import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainHeader } from "../../Header/Header";
import { FaHeart, FaTelegramPlane, FaUserCircle } from 'react-icons/fa'
import './mainPage.css';
const API = 'http://localhost:9000'
// const API = 'https://instaserver-ze4o.onrender.com'

export function MainPage() {
    const navigate = useNavigate();
    const [postsData, setPostsData] = useState([]);
    const [comment, addComment] = useState([]);
    console.log(postsData)

    useEffect(() => {
        fetch(`${API}/posts`,{
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(res => {
                return res.json();
            }).then(data => {
                // console.log(data)
                console.log("in then");
                setPostsData(data.post);
            }).catch(e => {
                console.log("in catch");
                console.log(e);
            })
    }, [navigate])
    return (
        <>
        <div className="main-page-container">
            <MainHeader/>
            <div className="main-page-box">

                {postsData.map((data) => {
                    return (
                        <>
                        <div className="post-box">
                            <div className="post-header">
                                <div className="post-image cursor"><FaUserCircle size='1.7em' /></div>
                                <div className="user-details">
                                    <span className="user-name cursor">{data.user.name}</span>
                                    <span className="user-location">{data.user.city}, </span>
                                    <span className="user-location">{data.user.state}</span>
                                </div>
                                <div className="edit-delete">
                                    <span className="edit-delete-btn cursor">...</span>
                                </div>
                            </div>
                            <div className="image-box">
                                <img src={data.image} alt="cover" />    
                            </div>
                            <div className="reaction-box">
                                <span className="like-btn" style={{paddingLeft: '10px'}}><FaHeart  /></span>
                                <span className="share-btn" style={{paddingLeft: "5px"}}><FaTelegramPlane/></span>
                                <span className="date" style={{float: "right", paddingRight: "5px"}}>{data.date}</span>
                                <div style={{marginLeft: '14px'}}>{data.description}</div>
                                <span className="comment-box" style={{display: "block"}}>
                                    <input type="text" style={{width: '90%'}} placeholder="comment here" onChange={(e) => addComment(e.target.value)} />
                                </span>
                                    {/* {comment} */}
                            </div>
                            <br />
                            <hr />
                        </div>
                        </>
                    )
                }).reverse()
                }
            </div>
        </div>
        </>
    )
}