import { useState, useEffect } from 'react';
import { getAllNotifications } from '../utils/APIRoutes';
import axios from "axios";
import Logout from './Logout';
import Logo from '../assets/logo.svg'

export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentUserImage, setCurrentUserImage] = useState('')
    const [currentSelected, setCurrentSelected] = useState('')
    const [notifications, setNotifications] = useState('')

    useEffect(() => {
        if (currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    useEffect(() => {
        async function fetchNotifications(){

            if(currentUser) {
                const fetch_notifications = await axios.get(`${getAllNotifications}/${currentUser._id}`);
                setNotifications(fetch_notifications.data[0].notifications)
            }
        }
        fetchNotifications()
    })

    const changeCurrentChat = (idx, contact) => {
        setCurrentSelected(idx);
        changeChat(contact)
    }

    const convertToUpperCase = ((text) => {
        return text.charAt(0).toUpperCase()+ text.slice(1)
    });

    const notificationCount = ((id) => {
        if (notifications){
            const data = notifications.filter((noti) => noti.from === id)
            if (data.length){
                return data[0].notification_count
            }
        }
        return 0
    })

    // const getLastMessageTime = ((id) => {
    //     if (notifications){
    //         const data = notifications.filter((noti) => noti.from === id)
    //         if(data.length){
    //             const date = data[0].time
    //             let hour = new Date(date).getHours();
    //             let min = new Date(date).getMinutes();
    //             if (hour < 10){
    //                 hour = '0' + hour.toString();
    //             }
    //             if (min < 10){
    //                 min = '0' + min.toString();
    //             }
    //             if (hour && min) return hour + ' : ' + min + ' ';
    //         }
    //     }
    // })

    return(
        <>
            {currentUserImage && currentUserName && (
                <div className='text-white w-full h-[100vh] sm:h-[84vh] grid grid-rows-12 bg-[#080420]'>
                    <div className='row-span-2 grid grid-cols-3'>
                        <img src={Logo} alt="" className='h-20 w-20 min-[380px]:h-24 min-[380px]:w-24 mt-6 ml-10'/>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-white text-4xl ml-10'>{convertToUpperCase('snappy')}</h1>
                        </div>
                        <div className='sm:hidden flex items-center mt-12 justify-center '>
                            <Logout />
                        </div>
                    </div>
                    <div className='overflow-auto row-span-8 '>
                        {contacts.map((contact, idx) => {
                            return(
                                <div key={idx} className={`${idx === currentSelected ? 'text-white grid grid-cols-12 px-8 items-center overflow-auto gap-3 min-h-20 mx-5 mt-3 cursor-pointer ease-in-out duration-500 bg-[#997af0]' : 'text-white grid grid-cols-12 items-center px-8 overflow-auto gap-3 min-h-20 mx-5 mt-3 cursor-pointer bg-[#ffffff39]'}`} onClick={() => changeCurrentChat(idx, contact)}>
                                    <div className='avatar col-span-3'>
                                        <img src={`data:image/svg+xml;base64, ${contact.avatarImage}`} alt="avatar" className='h-16'/>
                                    </div>
                                    <div className='text-xl ml-5 col-span-7'>
                                        <h3 className='text-white'>
                                            {convertToUpperCase(contact.username)}
                                        </h3>
                                    </div>
                                    <div className='col-span-2 mt-6'>
                                        {notificationCount(contact._id) >0 &&<div className='flex ml-1 justify-center items-center w-6 h-6 bg-amber-500 rounded-full'>
                                            {notificationCount(contact._id)}
                                        </div>}
                                        {/* <div className='w-12 mr-10'>
                                            {getLastMessageTime(contact._id)}
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='row-span-2 flex py-4 xl:py-6 bg-[#0d0d30] px-12 items-center gap-8'>
                        <div className={`text-white inline-flex gap-8 contact}`}>
                            <div className='avatar'>
                                <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt="avatar" className='h-12 xl:h-20'/>
                            </div>
                            <div className='username flex justify-center items-center'>
                                <h1 className='text-xl'>
                                    {convertToUpperCase(currentUserName)}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}