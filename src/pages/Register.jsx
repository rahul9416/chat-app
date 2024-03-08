import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import { toast, ToastContainer } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Loader from "../assets/loader.gif"

export default function Register() {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const { username, email, password, confirmPassword } = credentials
            if (password === confirmPassword) {
                const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
                const uid = userCredential.user.uid
                const { data } = await axios.post(registerRoute, { uid, username, email, password });
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                if (data.status === true) {
                    setLoading(false)
                    navigate('/setAvatar')
                }
            }
            else {
                setErrorMessage("Password does not match the confirm password")
                setError(true)
                setLoading(false)
            }
        } catch (error) {
            setErrorMessage("Can't Sign in")
            setError(true)
            setLoading(false)
        }
    }
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const convertToUpperCase = ((text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    });

    useEffect(() => {
        async function fetchCurrentUser() {
            if (JSON.parse(localStorage.getItem('chat-app-user')) === null) {
                navigate('/register')
            }
            else {
                navigate('/')
            }
        }
        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        if(error) {
          setTimeout(() => {
            toast.error(errorMessage, {
              position: "bottom-right",
              autoClose: 8000,
              draggable: true,
              theme: 'dark',
              pauseOnHover: true,
            });
            setError(false)
          }, 100)
        }
      }, [error, errorMessage])

    return <>
        {loading ? (
            <div className='flex justify-center flex-col gap-12 items-center bg-[#131324] h-[100vh] w-[100vw]'>
                <img src={Loader} alt="" />
            </div>
        ) : (
            <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-[#131324]'>
                <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-2 bg-[#00000076] rounded-[2.5rem] sm:px-8 sm:py-10'>
                    <div className='flex gap-4 justify-center items-center'>
                        <img src={Logo} alt="" className='h-20 w-20 min-[380px]:h-24 min-[380px]:w-24 mt-6' />
                        <div className='flex items-center justify-center'>
                            <h1 className='text-white text-4xl'>{convertToUpperCase('snapppy')}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 center px-6 py-5 sm:px-12 sm:py-20 sm:pb-10'>
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none' value={credentials.username}/>
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none' value={credentials.email}/>
                        <div className='flex bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'>
                            <input type={showPassword ? "text" : "password"} placeholder='Password' name='password' value={credentials.password} onChange={handleChange} className='w-[90%] bg-transparent focus:outline-none' />
                            <button type='button' className='w-[10%] text-2xl' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <IoEyeOff className='text-white' />
                                ) : (
                                    <IoEye className='text-white' />
                                )}
                            </button>
                        </div>
                        <div className='flex bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'>
                            <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' name='confirmPassword' value={credentials.confirmPassword} onChange={handleChange} className='w-[90%] bg-transparent focus:outline-none' />
                            <button type='button' className='w-[10%] text-2xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
                                    <IoEyeOff className='text-white' />
                                ) : (
                                    <IoEye className='text-white' />
                                )}
                            </button>
                        </div>
                        <button type="submit" className='text-white bg-[#997af0] py-3 sm:py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md'>CREATE USER</button>
                    </div>
                    <div className='flex justify-center items-center pb-10'>
                        <button className='flex justify-center items-center' onClick={() => navigate('/login')}>
                            <h3 className='text-white underline'>Already a User? Log in now !!!</h3>
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        )}
    </>
}

