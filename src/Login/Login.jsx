import React from "react";
import './Login.css'
import { LoginHeader } from "../Header/Header";
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from "react";
import loader from '../loader.gif'
// const API = 'http://localhost:9000/' 
const API = 'https://instacloneserver-yk4r.onrender.com' 


export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const [hidden, setHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    // console.log(loginData);

    const handelsubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        console.log("in handelsubmit");

        await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(res => {
                return res.json();
            }).then(data => {
                setIsLoading(false);
                // console.log(data);
                if(data.message === 'email/phone not exists') setEmailErr(data.message);
                else if (data.message === 'invalid password') setPassErr(data.message);
                else {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user);
                    navigate('/posts')
                }
            })

    }

    return (
        <>
            {/* <LoginHeader/> */}
        <section className="login-container center">
            {isLoading ? <img className="loader" src={loader} alt='loading' /> : '' }
            <div className="login-box border">
                <div className="signin-header ">
                    <p style={{fontSize: "1.1em", float: "left", marginLeft: "19px"}}>
                        Sign In :
                    </p>
                </div>

                <form className="input-box center" onSubmit={(e) => handelsubmit(e)} >
                    <div className="input">
                        <input type="text" placeholder="username"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        /> <br/>
                        <span style={{color: "red"}}>{emailErr}</span>
                    </div>
                    <div className="input">
                        <input type={hidden ? 'password' : 'text'} placeholder="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        /> 
                        <span className="hide-icon">
                            {hidden ? <FaEye className="fa-eye" onClick={() => setHidden(false)}/> 
                            : <FaEyeSlash className="fa-eye" onClick={() => setHidden(true)}/> }
                        </span> <br/>
                        <span style={{color: "red"}}>{passErr}</span>
                    </div>
                    <button className="btn" type="submit">Login</button>
                    <p  className="sign-up">Need to <span className="sign-up" onClick={() => navigate('/register')}>
                        SignUp
                        </span>
                    </p>
                </form>
            </div>
        </section>
        </>
    )
}

