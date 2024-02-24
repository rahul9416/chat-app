import {useRef, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

export default function ChatArea({messages}) {

    const scrollRef = useRef();
    
    const formatDate = (date) => {
        let hour = new Date(date).getHours();
        let min = new Date(date).getMinutes();
        if (hour < 10){
            hour = '0' + hour.toString();
        }
        if (min < 10){
            min = '0' + min.toString();
        }
        return hour + ' : ' + min + ' ';
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [messages]);
    return (
        <div className='text-white h-[81vh] sm:h-[61vh] overflow-auto scrollbar-w-3 scrollbar-track-[#997af0] scrollbar-thumb-[#997af0] scrollbar-thumb-rounded-full'>
            {messages.map((message) => {
                return (
                    <div ref={scrollRef} key={uuidv4()} className='p-4 flex flex-col gap-4'>
                        <div className={`${message.fromSelf ? "flex relative items-end justify-end mb-[10px]": "flex relative justify-start items-start mb-[10px]"}`}>
                            <div className={`${message.fromSelf ? "bg-[#4f04ff21] max-w-[40%] relative break-words p-4 pr-[40px] pb-[20px] min-w-40 text-md": "bg-[#9900ff20] p-4 pr-[40px] pb-[20px] min-w-40 text-md relative max-w-[40%] break-words"}, ${message.msgs.length > 10 ? 'pb-[25px] rounded-xl' : 'pb-[15px] rounded-xl'}`}>
                                <p className='text-[#d1d1d1] text-lg'>{message.msgs}</p>
                                <span className='absolute bottom-2 right-2 text-[13px]'>
                                    <span className='text-[13px] text-white mr-2'>{formatDate(message.timeStamp)}</span>
                                    <FontAwesomeIcon icon={faCheckDouble} className='text-white'/>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}