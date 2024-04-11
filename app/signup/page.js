"use client"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import Link from "next/link"

const SignupStyled = styled.nav`
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


position:absolute;
align-items:center;
z-index:2;
background-color:;

justify-content:center;
backdrop-filter: blur(5px);
}
form{
    display:flex;
    width:300px;
    height:300px;
    align-items:center;
    flex-direcion: column;
    padding:10px;
    margin:10px;
    display:block;
    items-center:center;
    border:3px solid rgb(1,1,1);
    
    
}
input{
    width:200px;
    height:30px;
    display:block;
    padding:10px;
    margin:15px;
    color: red;
    background-color:rgb(204, 255, 255)
    
    
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

`
async function post_data_signup(e) {
    e.preventDefault()
    let userId = document.getElementById("uid").value
    let password = document.getElementById("pass").value

    console.log(userId);
    console.log(password);
    try {
        const res = await axios.post("http://localhost:6969/server/signup", { userId, password });
        toast.success(res.data.message);

       
        console.log(res)
    }
    catch (err) {
        console.log(err);
    }
}
export default function Signup() {
    return (
        <SignupStyled>
            <div className="w-screen h-screen background-image">
            
               <img src="/833315.jpg" alt="background"></img>
            </div>
            <div className="form-container">
                <form >
                    
                    <h1 className="p-2 text-center">
                            Sign Up
                    </h1>
                    <div className="fields">
                    <input id="uid" className="username " placeholder="Username"></input>
                    
                        <input id="pass" className="password" placeholder="Password"></input>
                        <button onClick={post_data_signup} className="">Submit</button>
                        
                        <p className="text-white">Already have an account  <Link href="/login">Click here</Link></p>
                    </div>
                    
                   
                    

                    
                     
                    
                </form>
                
            </div>
            <Toaster/>
    
        </SignupStyled>
        
    )
    
}