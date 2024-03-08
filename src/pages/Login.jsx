import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { loginRoute } from '../utils/APIRoutes';
import axios from 'axios'
import Logo from "../assets/logo.svg"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "../assets/loader.gif"
import { IoEye, IoEyeOff } from "react-icons/io5";


export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (userCredential) {
        const uid = userCredential.user.uid;
        const data = await axios.post(loginRoute, { uid })
        const userData = data.data
        localStorage.setItem('chat-app-user', JSON.stringify(userData))
        if (!userData.isAvatarImageSet) {
          setLoading(false)
          navigate('/setAvatar')
        }
        else {
          setLoading(false)
          navigate('/')
        }
      }
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  };

  useEffect(() => {
    async function fetchCurrentUser() {
      if (JSON.parse(localStorage.getItem('chat-app-user')) === null) {
        navigate('/login')
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
        toast.error("Invalid Credentials", {
          position: "bottom-right",
          autoClose: 8000,
          draggable: true,
          theme: 'dark',
          pauseOnHover: true,
        });
        setError(false)
      }, 100)
    }
  }, [error])

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const convertToUpperCase = ((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  });

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
          <div className='flex flex-col gap-8 center px-6 py-5 sm:px-12 sm:py-20 pb-10'>
            <input type="email" placeholder='Email' name='email' value={credentials.email} onChange={handleChange} className='bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none' />
            <div className='flex bg-transparent p-3 sm:p-4 border-2 border-[#4e0eff] w-[100%] text-base focus:border-[#997af0] text-white rounded-md focus:outline-none'>
              <input type={showPassword ? "text" : "password"} placeholder='Password' name='password' value={credentials.password} onChange={handleChange} className='w-[90%] bg-transparent focus:outline-none'/>
              <button type='button' className='w-[10%] text-2xl' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <IoEyeOff className='text-white'/>
                  ): (
                  <IoEye className='text-white'/>
                )}
              </button>
            </div>
            <button type="submit" className='text-white bg-[#997af0] py-3 sm:py-4 ease-in duration-300 border-none font-bold text-base hover:bg-[#4e0eff] rounded-md'>LOG IN</button>
          </div>
          <div className='flex justify-center items-center pb-10'>
            <button className='' onClick={() => navigate('/register')}>
              <h3 className='text-white underline'>Not a User? Sign in now !!!</h3>
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>)}
  </>
}
