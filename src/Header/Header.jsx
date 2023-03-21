import React from "react";
import './Header.css';
import { FaInstagram } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


export function LoginHeader() {
    return (
        <>
        <section className="login-header">
            <div className="logo"><b><FaInstagram size='1.8em' /></b></div>
            <div className="serach-box"></div>
            <div className="nav-box"></div>
        </section>
        </>
    )
}

export function MainHeader() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <>
        <section className="login-header">
            <div className="logo"><b><FaInstagram size='1.8em' /></b></div>
            <div className="main-serach-box"></div>
            <div className="nav-box">
                <nav className="navbar">
                    <span className="nav" onClick={(e) => navigate('/posts')}>Home</span>
                    <span className="nav" onClick={(e) => navigate('/createpost')}>Create</span>
                    <span className="nav logout" onClick={(e) => logout()}>logout</span>
                </nav>
            </div>
        </section>
        </>
    )
}