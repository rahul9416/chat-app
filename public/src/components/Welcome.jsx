import react from "react"
import Robot from "../assets/robot.gif"

export default function Welcome({currentUser}) {
    const convertToUpperCase = ((text) => {
        return text.charAt(0).toUpperCase()+ text.slice(1)
    });
    return(
        <div className="flex items-center justify-center w-full">
            <div>
                <div className="flex items-center justify-center">
                    <img src={Robot} alt="welcomeuser"/>
                </div>
                <div className="flex justify-center items-center">
                    <div className="">
                        <h1>
                            {currentUser && (
                                <div className="text-white text-4xl">Welcome, <span>{convertToUpperCase(currentUser.username)} !</span></div>
                            )}
                        </h1>
                        <h3 className="text-white text-lg ml-2">Please select a chat to start</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}