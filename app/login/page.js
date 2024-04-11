"use client"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Cookie } from "next/font/google"


const LoginStyled = styled.nav`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:black;
    
.background-image{
    z-index:1;
    opacity:0.9;
    width:100%;
    height:100vh;
    overflow:hidden;
   
    
}
.background-image img{
    width:100%;
    height:100%;
}

.form-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    z-index: 2;
    justify-content: center;
    backdrop-filter: blur(5px);
}
form{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:300px;
    height:300px;
    padding:10px;
    margin:10px;
    border:3px solid rgb(1,1,1);
    
    
}
input{
    width:200px;
    height:30px;
    padding:10px;
    margin:15px;
    color: black; 
    background-color:white;
    
    
}
.fields{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
h1{
    color:rgb(179, 0, 0);
    font-size:2em;
    font-weight:600;
}
button{
    width:100px;
    height:40px;
    padding:10px;
    margin:10px;
    
    background-image:url("https://i.pinimg.com/474x/55/de/67/55de67fcdbe9f06e1eb1caed4fd9510f.jpg");
    font-weight:600;
    color:white;
    border: 2px solid #12f7ff;;
    border-shadow:red;
    border-radius:8%;

    
}
p{
    color:white;
}

`



export default function Login() {

    const router = useRouter();


async function post_data_login(e) {
    
    
    e.preventDefault();
    
    
    let userId = document.getElementById("uid").value
    let password = document.getElementById("pass").value
   
    try {
        let res = await axios.post("http://localhost:6969/server/login", { userId, password })
        toast.success(res.data.message)
        console.log(res); 
        toast.success(res.data.data)
        if (res.data.message === "Login Successful") {
            localStorage.setItem("username", userId )
            const userid = res.data.data
           
            
            router.push("/landing")
        }
        
        
    }
    catch (error) {
        toast.error(error);
        console.log(error);
    }
    
    
    
}

    return (
        <LoginStyled>
            <div className="w-screen h-screen background-image">
            
                <img src="833315.jpg" alt="background">
                    
                </img>
            </div>
            
            <div className="form-container">
                <form >
                    
                    <h1 className="p-2 text-center">
                            Signin
                    </h1>
                    <div className="fields">
                    <input id="uid" className="username" placeholder="Username"></input>
                    
                        <input  id="pass" className="password" placeholder="Password"></input>
                        <button onClick={post_data_login} className="">Submit</button>
                        
                        <p>Don't have an account <a href="http://localhost:3000/signup" >Click here</a></p>
                    </div>
                    
                   
                    

                    
                     
                    
                </form>
                
            </div>
    <Toaster/>
        </LoginStyled>
        
    )
    
}
