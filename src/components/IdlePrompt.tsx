import { useIdleTimer } from "react-idle-timer";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import DialogModal from "./DialogModal";
import "../styles/idlePrompt.css"

// 600_000, 60_000
const IdlePrompt = () => {
    const timeout = 600_000;
    const promptBeforeIdle = 60_000;
    
    const {setUser, setAccessTokenData } = useContext(UserContext)
    const [remaining, setRemaining] = useState(timeout)
    const [open, setOpen] = useState(false)

    const onIdle = () => {
        setOpen(false)
        setAccessTokenData(null)
        setUser(null)
        window.localStorage.removeItem("localAccount");
    }

    const onActive = () => {
        setOpen(false)
    }

    const onPrompt = () => {
        setOpen(true)
    }


    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500
    })

    const handleStillHere = () => {
        activate()
        setOpen(false)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })

    return (
        <DialogModal open={open}>
            <div id="idle-prompt-container">
                <p>Are you still here?</p>
                <p>The popup occurs when you have been idle for a long period of time.</p>
                <p>Logging out in {remaining} seconds</p>
                <div className="button-row">
                    <button onClick={handleStillHere}>I am still here!</button>
                    <button onClick={onIdle}>Logout</button>
                </div>
            </div>

        </DialogModal>
    );
};

export default IdlePrompt;