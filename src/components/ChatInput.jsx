import { useState } from 'react';
import Picker from 'emoji-picker-react'
import styled from 'styled-components'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emoji) => {
        let message = msg;
        if (emoji) {
            message += emoji.emoji;
            setMsg(message)
        }
    }

    const sendChat = ((event) => {
        event.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    })

    return(
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} className='emoji-btn'/>
                    {showEmojiPicker && <Picker onEmojiClick={(a) => handleEmojiClick(a)} className='emoji-display' />}
                </div>
            </div>
            <form className='input-container' onSubmit={(event) => sendChat(event)}>
                <input type="textarea" placeholder='Type your message here' value={msg} onChange={(e) => setMsg(e.target.value)}/>
                <button><IoMdSend /></button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    @media screen and (max-width: 500px) {
        grid-template-columns: 10% 90%;
    }
    .button-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        gap: 1rem;
        width: 100%;
        .emoji {
            position: relative;
            .emoji-btn {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-display {
                position: absolute;
                top: -490px;
                left: -20px;
                box-shadow: 0 2px 10px #9486f3;
                border-color: #9a86f3;
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: red;
                    border-color: #9a86f3
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        background-color: #ffffff34;
        gap: 0.5rem;
        @media screen and (max-width: 500px) {
            gap:0;
        }
        input{
            width: 90%;
            height: 5vh;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                width: 80%;
            }
            @media screen and (min-width: 300px) and (max-width: 720px) {
                width: 75%;
            }
        }
        button {
            width: 10%;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 1.5rem;
                color: white;
            }
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                width: 20%;
                svg {
                    font-size: 2rem;
                }
            }
            @media screen and (min-width: 300px) and (max-width: 720px) {
                width: 25%;
                svg {
                    font-size: 2rem;
                }
            }
        }
    }
`