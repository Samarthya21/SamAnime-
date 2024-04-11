"use client"
import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import styled from "styled-components"
import axios from "axios";
import Link from "next/link.js";
import { Toaster, toast } from "react-hot-toast"
 


export default function myAnime() {
    const [titles, setTitles] = useState([]);
    const [images, setImages] = useState([]);

    async function handleRemovingtitles(title, image) { 
        try {
            const userId = localStorage.getItem("username")
            console.log(userId);
            const res = await axios.post("http://localhost:6969/server/removeTitle", { userId, title, image });
            console.log(res.data);
            toast.success(`${title} removed from the list`);
            getTitles();
        }
        catch (err) {
            console.log(err);
        }
    }
    async function getTitles() {
        try {
            const userId = localStorage.getItem("username")
            console.log(userId);
            const res = await axios.post("http://localhost:6969/server/getMyTitles", { userId });
            console.log(res.data.titles);
            console.log(res.data.images);
            setTitles(res.data.titles);
            setImages(res.data.images); 

        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getTitles();
    }, [])
    if(titles.length === 0){
        return (
            <div className="w-screen h-screen bg-slate-800">
                <div className="fixed top-0 left-0 right-0 flex justify-between w-screen h-20 bg-fuchsia-950 te">
                <div className="px-7 py-6">
                    <span className="text-lg font-semibold text-white hover:text-teal-200 "><Link href="/landing">HOME</Link></span>
                </div>
                <div>
                <ul className="flex flex-row justify-center space-x-4 p-4 text-lg">
                    <li className="p-2 font-semibold text-white hover:text-teal-200">
                        <Link href="/myAnime">Anime List</Link>
                    </li>
                    <li className="p-2 font-semibold text-white hover:text-teal-200">Completed</li>
                    <button className="border border-solid border-teal-200 rounded-md font-semibold h-10 w-20  hover:bg-teal-200 hover:text-black text-white">
                        Logout
                    </button>
                </ul>
                </div>
                </div>
                <div className="items-center text-center font-bold pt-32">
                    No Anime added to the list 
                </div>
            </div>
            
        )
    }

    return (
        <div className="w-screen h-max  bg-slate-800" >
            <div className="fixed top-0 left-0 right-0 flex justify-between w-screen h-20 bg-fuchsia-950 te">
                <div className="px-7 py-6">
                    <span className="text-lg font-semibold text-white hover:text-teal-200 "><Link href="/landing">HOME</Link></span>
                </div>
                <div>
                <ul className="flex flex-row justify-center space-x-4 p-4 text-lg">
                    <li className="p-2 font-semibold text-white hover:text-teal-200">
                        <Link href="/myAnime">Anime List</Link>
                    </li>
                    <li className="p-2 font-semibold text-white hover:text-teal-200">Completed</li>
                    <button className="border border-solid border-teal-200 rounded-md font-semibold h-10 w-20  hover:bg-teal-200 hover:text-black text-white">
                        Logout
                    </button>
                </ul>
                </div>
            </div>
            <div className="mt-16 flex flex-wrap justify-center px-10 py-5 w-screen h-full bg-slate-800">
                {titles.map((t, index) => (
                    <div key={index} className="m-10">
                        <Card title={titles[index]} image_url={images[index]} />
                        <button onClick={() => handleRemovingtitles(titles[index],images[index])} className="mt-2 text-zinc-100 font-semibold w-60 h-10 bg-slate-500">Remove from the List</button>
            
                        
                    </div>
                ))}
            </div>
            <Toaster/>
        </div>
    
    )
}