import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { loginRoute } from '../utils/APIRoutes';
import axios from 'axios'
import Logo from "../assets/logo.svg"

export default function Login() {
    const [credentials, setCredentials] = useState({username: '', email: '', password: '', confirmPassword: ''})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          if (true) {
            const uid = userCredential.user.uid;
            const data = await axios.post(loginRoute, {uid})
            const userData = data.data
            localStorage.setItem('chat-app-user', JSON.stringify(userData))
            if(!userData.isAvatarImageSet){
              navigate('/setAvatar')
            }
            else{
              navigate('/')
            }
          }
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };
    
      useEffect(()=>{
        async function fetchCurrentUser(){
            if(JSON.parse(localStorage.getItem('chat-app-user')) === null){
                navigate('/login')
            }
            else{
                navigate('/')
            }
        }
        fetchCurrentUser();
    }, [navigate]);

    const handleChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    const convertToUpperCase = ((text) => {
      return text.charAt(0).toUpperCase()+ text.slice(1)
  } );

    return <>
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-[#131324]'>
            <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-2 bg-[#00000076] rounded-[2.5rem] sm:px-8 sm:py-10'>
                <div className='flex gap-4 justify-center items-center'>
                  <img src={Logo} alt="" className='h-20 w-20 min-[380px]:h-24 min-[380px]:w-24 mt-6'/>
                  <div className='flex items-center justify-center'>
                    <h1 className='text-white text-4xl'>{convertToUpperCase('snappy')}</h1>
                  </div>
                </div>
                <div className='flex flex-col gap-8 center px-6 py-5 sm:px-12 sm:py-20 pb-10'>
                    <input type="email" placeholder='Email' name='email' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <button type="submit" className='text-white bg-[#997af0] py-3 sm:py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md'>LOG IN</button>
                </div>
                <button className='flex justify-center items-center pb-10' onClick={() => navigate('/register')}>
                  <h3 className='text-white underline'>Not a User? Sign in now !!!</h3>
                </button>
            </form>
        </div>
    </>
}
