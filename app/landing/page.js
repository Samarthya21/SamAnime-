"use client"
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import styled from "styled-components"
import Cookies from "js-cookie";
import { cookies } from "next/headers.js";
import axios from "axios";
import { useDebounce } from "@react-hook/debounce";
import Link from "next/link.js";
import { useRouter } from 'next/navigation';
import { user } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast"


const LoaderStyled = styled.nav`
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`


export default function Landing() {
    const router = useRouter();
    const [isPresent, setPresent] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [titles, setTitles] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        
        setPresent(true);
        getanime();
        if (typeof window !== 'undefined') {
            setUserId(localStorage.getItem("username")); // Only access localStorage if window is defined
        }
        

    }, []);
    
   
    if (userId === null ){
        return (
            <div className="h-screen w-screen">Login first</div>
        )
       
    }
    function handleLogout() {
        if (typeof window !== 'undefined') {
            localStorage.setItem("username", null);
            setUserId(null);
        }
    }
    
    
    

   

    async function getanime() {
        try {
            const baseURL = "https://api.jikan.moe/v4";
            const res = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
            const data = await res.json();
            const all_info = data.data;
            console.log(all_info);
            const newTitles = all_info.map(anime => anime.title_english);
            setTitles(newTitles);
            const newImages = all_info.map(anime => anime.images.jpg.image_url);
            setImages(newImages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

   


    
    
    const debouncedHandleSendDataToAPI = (async () => {
        try {
            const uid= localStorage.getItem("username")
            const datatosend = {
                titles: selectedTitles,
                userId: uid,
                images: selectedImages,

            }
            const res= axios.post("http://localhost:6969/server/mytitles", datatosend);
        }
        catch (err) {
            console.log(err);
        }
      }); 
      
      const  handleSelectedTitles=(title, image_url) => {
          setSelectedTitles((prevTitles) => [...prevTitles, title]);
          setSelectedImages((prevImages) => [...prevImages, image_url]);
          toast.success(`${title} Added to the list`);
          
        debouncedHandleSendDataToAPI();
        
    }
    
    
    
    
    if (isLoading) {
        return (<LoaderStyled>
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loader"></span>
            </div>
            
        </LoaderStyled>
      )
    }
    if(userId !== null){
        return(<div className="w-screen h-max  bg-slate-800" >
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
                    <button onClick={handleLogout } className="border border-solid border-teal-200 rounded-md font-semibold h-10 w-20  hover:bg-teal-200 hover:text-black text-white">
                    Logout
                </button>
                </ul>
            </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-center px-10 py-5 w-screen h-full bg-slate-800">
            {titles.map((t, index) => (
                <div key={index} className="m-10">
                    <Card title={t} image_url={images[index]} />
                    <button onClick={() => handleSelectedTitles(t,images[index])} className="mt-2 text-zinc-100 font-semibold w-60 h-10 bg-slate-500">Add to the List</button>
        
                    
                </div>
            ))}
            </div>
            <Toaster/>
    </div>
);
    }
    
        
        
}



