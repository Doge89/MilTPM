import React, { useEffect } from 'react'
import { DeadTimeContainer } from '../../../styles/hxh'


function DeadTime({ title, time, setDeadMant, setDeadProduction, setMaterial, setDeadQuality, setDeadEngineering,
                    setDeadChange, isOpened }){
    // useEffect(() => {
    //     if(!isOpened){
    //         setDeadChange("00:00:00")
    //         setDeadEngineering("00:00:00")
    //         setDeadMant("00:00:00")
    //         setDeadProduction("00:00:00")
    //         setDeadQuality("00:00:00")
    //         setMaterial("00:00:00")
    //     }
    // }, [isOpened])
    return (
        <DeadTimeContainer>  
            <h1>{title}</h1>      
            <span>{time}</span>
        </DeadTimeContainer>
    )

}

export default DeadTime