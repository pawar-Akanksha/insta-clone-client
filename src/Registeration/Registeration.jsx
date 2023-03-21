import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginHeader } from "../Header/Header";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Registeration.css'
import { useState } from "react";
import loader from '../loader.gif'
const API = 'http://localhost:9000'
// const API = 'https://instaserver-ze4o.onrender.com'

export function Register() {
    const navigate = useNavigate();
    const [registerationData, setRegisterationData] = useState({
        name: '', email: '', phone: '', password: '', state: '', city: '' });
    const [hidden, setHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [emailErr, setEmailErr] = useState('');
    const [phoneErr, setPhoneErr] = useState('');
    console.log("data: " + JSON.stringify(registerationData));

    const handelsubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        console.log("in handelsubmit");

        await fetch(`${API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerationData)
        })
            .then(res => {
                return res.json();
            }).then(data => {
                setIsLoading(false);
                console.log(data);
                if(data.message == 'email already exist!') setEmailErr(data.message);
                else if (data.message == "phone already exist!") setPhoneErr(data.message);
                else {
                    alert(data.message);
                    navigate('/')
                }
            })

    }
    return (
        <>
        <section className="registeration-container center">
            {isLoading ? <img className="loader" src={loader} alt='loading' /> : '' }
            {/* <LoginHeader/> */}
            <div className="registeration-box border">
                <div className="signup-header ">
                    <p style={{fontSize: "1.1em", float: "left", marginLeft: "19px"}}>
                        Sign up :
                    </p>
                </div>

                <form className="input-box center" onSubmit={(e) => handelsubmit(e)} >
                    <div className="input">
                        <input type="text"  placeholder="name" 
                        value={registerationData.name}
                        onChange={(e) => setRegisterationData({...registerationData, name: e.target.value})} /> <br/>
                        <span style={{color: "red"}}></span>
                    </div>
                    <div className="input">
                        <input type="email" placeholder="email"
                        value={registerationData.email}
                        onChange={(e) => setRegisterationData({...registerationData, email: e.target.value})}
                         /> <br/>
                        <span style={{color: "red"}}>{emailErr}</span>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="phone" minLength='10' maxLength='10'
                        value={registerationData.phone}
                        onChange={(e) => setRegisterationData({...registerationData, phone: e.target.value})}
                         /> <br/>
                        <span style={{color: "red"}}>{phoneErr}</span>
                    </div>
                    <div className="input">
                        <input type={hidden ? 'password' : 'text'} placeholder="password"
                        value={registerationData.password}
                        onChange={(e) => setRegisterationData({...registerationData, password: e.target.value})}
                         />
                        <span className="hide-icon">
                            {hidden ? <FaEye onClick={() => setHidden(false)}/> 
                            : <FaEyeSlash onClick={() => setHidden(true)}/> }
                        </span> <br/>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="state"
                        value={registerationData.state}
                        onChange={(e) => setRegisterationData({...registerationData, state: e.target.value})}
                         /> <br/>
                        <span style={{color: "red"}}></span>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="city" 
                        value={registerationData.city}
                        onChange={(e) => setRegisterationData({...registerationData, city: e.target.value})}
                        /> <br/>
                        <span style={{color: "red"}}></span>
                    </div>
                    
                    <button type="submit">Submit</button>
                    <p>back to <span className="sign-up" onClick={() => navigate('/')}>Sign-In</span></p>
                </form>
            </div>
        </section>
        </>
    )
}