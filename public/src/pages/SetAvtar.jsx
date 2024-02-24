import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Buffer} from 'buffer'
import { setAvatarRoute } from '../utils/APIRoutes';
import Loader from '../assets/loader.gif'

export default function SetAvtar() {

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [timeLeft, setTimeLeft] = useState(10); 
    const navigate = useNavigate()

    const setProfilepicture = async () => {
        if(selectedAvatar ===undefined) {
            console.log("please select avatar")
        }
        else{

            const avatar = avatars[selectedAvatar]
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const uid= user.uid
            const response = await axios.post(setAvatarRoute, {uid ,avatar})
            const data = response.data
            localStorage.setItem('chat-app-user', JSON.stringify({...data}));
            navigate('/');
        }
    }

    const api = "https://api.multiavatar.com/apikey=D6z9JAFLmelcN3";

    useEffect(() => {
        async function fetchData() {
            const data = [];
            for(let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(`${api}/${Math.random() * 1000}`);
                    const buffer = Buffer.from(response.data); // Using Buffer.from() instead of new Buffer() (deprecated)
                    data.push(buffer.toString("base64"));
                    setIsLoading(false)
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
            setAvatars(data);
        }
        
        fetchData();
    
    }, []);

    useEffect(() => {
        async function checkAvatar() {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            if (user === null){
                navigate('/login')
            }
            else if (user.isAvatarImageSet) {
                navigate('/')
            }
        }

        checkAvatar()
    })


    useEffect(() => {
        const timer = setTimeout(() => {
          if (timeLeft > 0) {
            setTimeLeft(prevTime => prevTime - 1);
          }
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [timeLeft]);

      const refreshPage = () => {
        if (timeLeft === 0) {
            window.location.reload();
        }
      }

    return (
        <>
            {isLoading ? (
                <div className='flex justify-center flex-col gap-12 items-center bg-[#131324] h-[100vh] w-[100vw]'>
                    <img src={Loader} alt="" />
                    <h3 className='text-white text-xl'>Sit Back!!! Avatars are loading....</h3>
                    <button className='text-white  bg-[#997af0] px-5 py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md' onClick={() => refreshPage()}>{timeLeft > 0 ? `Reload in ${timeLeft}`:'Reload Now'}</button>
                </div>
            ) : (
                <div className='flex justify-center flex-col gap-12 items-center bg-[#131324] h-[100vh] w-[100vw]'>
                    <div>
                        <h1 className='text-white text-2xl'>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className='flex sm:gap-8'>
                        {avatars.map((avatar, idx) => {
                            return(
                                <div key={idx} className={`${selectedAvatar === idx ? 'border-4 p-2 cursor-pointer rounded-full ease-in-out duration-200 border-[#4e0eff]': 'border-2 p-2 cursor-pointer border-transparent rounded-full ease-in-out duration-200 '}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} height='100px' width='100px' alt="avatar" onClick={() => setSelectedAvatar(idx)} />
                                </div>
                            )})
                        }
                    </div>
                    <div>
                        <button className='text-white  bg-[#997af0] px-5 py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md' onClick={() => setProfilepicture()}>SET PROFILE PICTURE</button>
                    </div>
                </div>
            )}
        </>
    )
}