import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { allUsersRoute, host, updateNotification } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client"
import Logout from '../components/Logout';

export default function Chat() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined)
    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)

    const socket = useRef()

    useEffect(()=>{
        async function fetchCurrentUser(){
            if(JSON.parse(localStorage.getItem('chat-app-user')) === null){
                navigate('/login')
            }
            else{
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
                localStorage.setItem('current-chat', null)
            }
        }
        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        async function getAllContacts() {
            if(currentUser){
                if (currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    const contactss = []
                    contactss.push(...data.data)
                    setContacts(contactss);
                }
                else{
                    navigate('/login')
                }
            }
        }
        getAllContacts();
    }, [currentUser, navigate]);

    useEffect(() => {
        if (socket.current) {
            socket.current.emit("get-online-users", currentUser._id)
        }
    })

    useEffect(() => {
        async function pushfunction(id){
            if (currentUser._id){
                await axios.post(updateNotification, {
                    uid: currentUser._id,
                    notification: 0,
                    from: id
                })
            }
        }

        setInterval(() => {
            const fetchedCurrentChat = JSON.parse(localStorage.getItem('current-chat'))
            if (fetchedCurrentChat && currentUser && Object.entries(fetchedCurrentChat).length){
                if (fetchedCurrentChat._id){
                    pushfunction(fetchedCurrentChat._id)
                }
            }
        }, 5000)
    }, [currentUser])

    useEffect(() => {
        async function pushfunction(id){
            if (currentUser._id){
                await axios.post(updateNotification, {
                    uid: currentUser._id,
                    notification: 0,
                    from: id
                })
            }
        }

        const fetchedCurrentChat = JSON.parse(localStorage.getItem('current-chat'))
        if (fetchedCurrentChat && currentUser && Object.entries(fetchedCurrentChat).length){
            if (fetchedCurrentChat._id){
                pushfunction(fetchedCurrentChat._id)
            }
        }
    }, [currentChat, currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        localStorage.setItem('current-chat', JSON.stringify(chat))
    }


    return <>
        <div className='h-[100vh] w-[100vw] flex flex-col sm:justify-center sm:items-center sm:gap-4 bg-[#131324]'>
            <div className='w-[100%] hidden sm:block text-white'>
                <Logout />
            </div>
            <div className='flex justify-center items-center sm:h-[85vh] sm:w-[85vw] lg:w-[85vw]'>
                <div className=' bg-[#00000076] grid grid-cols-12'>
                    <div className='col-span-12 lg:hidden'>
                        {
                            currentChat === undefined ? (
                                <Contacts contacts= {contacts} currentUser = {currentUser} changeChat={handleChatChange} />
                            ) : (
                                <ChatContainer currentChat = {currentChat} currentUser={currentUser} socket={socket} />
                            )
                        }
                    </div>
                    <div className='col-span-12 hidden lg:flex lg:col-span-4 2xl:col-span-3'>
                        <Contacts contacts= {contacts} currentUser = {currentUser} changeChat={handleChatChange} />
                    </div>
                    <div className='hidden lg:flex lg:col-span-8 2xl:col-span-9' >
                    {
                        currentChat === undefined ? (
                            <Welcome currentUser = {currentUser}/>
                        ) : (
                            <ChatContainer currentChat = {currentChat} currentUser={currentUser} socket={socket} />
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
        
    </>
}