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
                        {/* <button className='emoji-btn' onClick={handleEmojiPickerHideShow}>Emoji</button> */}
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
    // background-color: #ffffff;
    padding: 0.7rem 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        height: 20%;
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            .emoji-btn {
                font-size: 2rem;
                color: #ffff00c8;
                cursor: pointer;
                margin-left: -1.5rem;
                @media screen and (min-width: 600px) and (max-width: 1080px) {
                    margin-left: -0.8rem;
                }
                @media screen and (min-width: 1080px) {
                    margin-left: -0.8rem;
                }
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
        gap: 2rem;
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
        }
        button {
            width: 10%;
            padding: 0.3rem 2rem;
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
                padding: 0.3rem 1rem;
                svg {
                    font-size: 2rem;
                }
            }
            @media screen and (min-width: 300px) and (max-width: 720px) {
                svg {
                    font-size: 2rem;
                }
            }
        }
    }
`