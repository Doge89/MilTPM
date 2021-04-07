import React, { useState, useEffect } from 'react'

import { ButtonPrimary } from '../../styles/common'

import { twoDigits } from '../../scripts'

function Timer({ timerPaused, timerRunning, setTimerRunning, intervalID, setIntervalID, type, startTimer, rerender }){

    const [timer, setTimer] = useState(0)
    

    const startInterval = () => {
        setTimerRunning(true)
        let newInterval = setInterval(() => {
            setTimer(timer => {
                localStorage.setItem(`timerValue${type}`, timer + 1)
                return timer + 1
            })
            
        }, 1000);
        setIntervalID(newInterval)
    }

    const startTimeOut = (e) => {
        e.preventDefault();
        const timerValue = localStorage.getItem(`timerValue${type}`)
        startTimer()
        if(!timerValue){ startInterval() }
    } 

    const getCurrentTime = () => {
        const seconds = timer % 60
        const minutes = Math.floor(timer / 60) % 60
        const hours = Math.floor(timer / 3600) % 60

        return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`
    }

    const handleTimerLoad = () => {
        const timerValue = localStorage.getItem(`timerValue${type}`)
        /* const timeIsPaused = localStorage.getItem(`timerPaused${type}`)
        const timeBeforeExit = localStorage.getItem(`timeBeforeExit${type}`) */
        
        if(timerValue){
            const timeElapsed = Number(timerValue)
            setTimer(timeElapsed)
        }
    }

    useEffect(() => {
        if(type !== ''){ handleTimerLoad() }
    }, [type, rerender])

    useEffect(() => {
        return () => {
            if(type !== '' && timerRunning){
                clearInterval(intervalID)
                localStorage.setItem(`timeBeforeExit${type}`, Date.now())
            }
        }
    }, [intervalID, type, timerRunning])

    useEffect(() => {
        if(timerPaused){ 
            clearInterval(intervalID) 
            setIntervalID(null)
        }else{
            if(!intervalID && timerRunning){ startInterval() }
        }
    }, [timerPaused, intervalID, timer, timerRunning])

    return(
        <>
        <ButtonPrimary height="4vh" onClick={startTimeOut} >Empezar</ButtonPrimary>
        <span>{timer ? getCurrentTime() : '00:00:00'}</span>
        </>
    )
}

export default Timer