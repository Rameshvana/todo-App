import React, { useState } from 'react';  
import { logInUser, userLogin } from '../service'
import Cookies from 'js-cookie'
import './index.css'; // Import CSS file  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  

    const navigate = useNavigate()

    const jwtToken = Cookies.get('jwt_token') == undefined ;
    console.log(jwtToken)

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        //const {username, password} = this.state
        const userDetails = {username, password}
        console.log(userDetails)

       

        const url = 'http://localhost:8000/login/'

        axios.post(url,userDetails)
        .then((res) => {
            console.log(res.status,res.data,res.ok)
            
            const jwtToken = res.data.jwtToken

            if (jwtToken != 'undefined'){
                
                Cookies.set('jwt_token', jwtToken, {
                    expires: 30,
                    })
                navigate('/')
            }
 
        })
        .catch((error) => {
            console.log(error.data)
            alert(error)
        })

        

        
}  

const loginField = () => (
    
        <div className="container">  
            <form className="login-form" onSubmit={handleSubmit}>  
                <h1 className="login-title">Welcome Back</h1>  
                <div className="input-group">  
                    <label htmlFor="username" className="input-label">Username</label>  
                    <input  
                        type="text"  
                        id="username"  
                        className="input-field"  
                        placeholder="Enter your username"  
                        value={username}  
                        onChange={(e) => setUsername(e.target.value)}  
                        required  
                    />  
                </div>  
                <div className="input-group">  
                    <label htmlFor="password" className="input-label">Password</label>  
                    <input  
                        type="password"  
                        id="password"  
                        className="input-field"  
                        placeholder="Enter your password"  
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}  
                        required  
                    />  
                </div>  
                <button type="submit" className="submit-button">Log In</button>  
                <div className="footer">  
                    <a href="#" className="footer-link">Forgot Password?</a>  
                    <a href="/signup" className="footer-link">Sign Up</a>  
                </div>  
            </form>  
        </div>  
    );  

const navigateHome = () => {
    return navigate('/')
}    







  return (
    <div>
       {jwtToken ? loginField() : navigateHome()} 
    </div>
  )
 
  


};  

export default Login;