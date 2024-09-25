import React, { useState } from 'react';  
import './index.css'; // Import CSS for signup  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [name, setName] = useState('');  

    const navigate = useNavigate()

    const handleSubmit = (e) => {  
        e.preventDefault();  
        console.log('Sign Up:', { username, password, name });  
        const userDetails = {username, password,name}
        console.log(userDetails)
        // Add signup logic here 
        const save_url = `http://localhost:8000/signup/` 
        axios.post(save_url,userDetails)
        .then((res) => {
            alert(res.data,res)
            console.log(res)
            navigate('/login')
        })
        .catch((e) => {
            alert('Un successfull...')
            console.log(e)
        })
    };  

    return (  
        <div className="signup-container">  
            <div className="form-wrapper">  
                <h1 className="form-title">Create Account</h1>  
                <form className="signup-form" onSubmit={handleSubmit}>  
                    <div className="input-group">  
                        <label className="input-label" htmlFor="username">Username</label>  
                        <input  
                            className="input-field"  
                            type="text"  
                            id="username"  
                            value={username}  
                            onChange={(e) => setUsername(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <div className="input-group">  
                        <label className="input-label" htmlFor="name">Name</label>  
                        <input  
                            className="input-field"  
                            type="text"  
                            id="name"  
                            value={name}  
                            onChange={(e) => setName(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <div className="input-group">  
                        <label className="input-label" htmlFor="password">Password</label>  
                        <input  
                            className="input-field"  
                            type="password"  
                            id="password"  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <button type="submit" className="signup-button">Sign Up</button>  
                </form>  
                <p className="form-footer">Already have an account? <a href="/login">Log in</a></p>  
            </div>  
        </div>  
    );  
};  

export default Signup;