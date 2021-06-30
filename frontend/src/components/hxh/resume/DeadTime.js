import React from 'react'
import { DeadTimeContainer } from '../../../styles/hxh'


function DeadTime({ title, time }){


    return (
        <DeadTimeContainer>
            <h1>{title}</h1>
            <span>{time}</span>
        </DeadTimeContainer>
    )

}

export default DeadTime