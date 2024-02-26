import React from 'react'
import { useState, useEffect } from 'react';
import { auth} from '../firebase';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import {toast, ToastContainer} from "react-toastify";

export default function Register() {
    const [credentials, setCredentials] = useState({username: '', email: '', password: '', confirmPassword: ''})

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.password === credentials.confirmPassword) {
            try {
                const {username, email, password, confirmPassword} = credentials
                const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
                const uid =  userCredential.user.uid
                const {data} = await axios.post(registerRoute, {uid, username, email, password});
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                if (data.status === true) {
                    navigate('/setAvatar')
                }
              } catch (error) {
                console.error('Error signing in:', error);
              }
        }
        else{
            toast.error("Password does not match the confirm password", {
                position: "bottom-right",
                autoClose: 8000,
                draggable: true,
                theme: 'dark',
                pauseOnHover: true,
              });
        }
    }
    const handleChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    const convertToUpperCase = ((text) => {
        return text.charAt(0).toUpperCase()+ text.slice(1)
    });

    useEffect(()=>{
        async function fetchCurrentUser(){
            if(JSON.parse(localStorage.getItem('chat-app-user')) === null){
                navigate('/register')
            }
            else{
                navigate('/')
            }
        }
        fetchCurrentUser();
    }, [navigate]);

    return <>
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-[#131324]'>
            <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-2 bg-[#00000076] rounded-[2.5rem] sm:px-8 sm:py-10'>
                <div className='flex gap-4 justify-center items-center'>
                <img src={Logo} alt="" className='h-20 w-20 min-[380px]:h-24 min-[380px]:w-24 mt-6'/>
                  <div className='flex items-center justify-center'>
                    <h1 className='text-white text-4xl'>{convertToUpperCase('snappy')}</h1>
                  </div>
                </div>
                <div className='flex flex-col gap-8 center px-6 py-5 sm:px-12 sm:py-20 sm:pb-10'>
                    <input type="text" placeholder='Username' name='username' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <input type="email" placeholder='Email' name='email' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'/>
                    <button type="submit" className='text-white bg-[#997af0] py-3 sm:py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md'>CREATE USER</button>
                </div>
                <button className='flex justify-center items-center pb-10' onClick={() => navigate('/login')}>
                  <h3 className='text-white underline'>Already a User? Log in now !!!</h3>
                </button>
            </form>
            <ToastContainer/>
        </div>
    </>
}

