import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import 'firebase/auth';
import { signOut } from 'firebase/auth';
import { IoLogOut } from "react-icons/io5";

export default function Logout() {

    const navigate = useNavigate();
    const handleSignOut = (async() => {
        try {
            await signOut(auth)
            navigate('/login')
            localStorage.setItem('chat-app-user', null)
            localStorage.setItem('current-chat', null)
        } catch (error) {
            console.log(error)
        }
    });

    return (
        <>
            <div className='w-[100%] flex justify-end items-end -mt-12 -ml-6'>
                <button className='h-12 w-12 flex items-center justify-center text-4xl rounded-full text-white bg-[#997af0]' onClick={() => handleSignOut()}><IoLogOut/></button>
            </div>
        </>
    )
}