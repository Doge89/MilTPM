import React, { useEffect, useState, useRef } from 'react'

import { ClockContainer } from '../../styles/common'

function Clock(){

    const interval = useRef(null)

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre']

    const [hour, setHour] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        
        interval.current = setInterval(() => {
            const date = new Date()
            setDate(`${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`)
            setHour(date.toString().split(' ')[4])
        }, 1000);
        return () => clearInterval(interval.current)
    }, [])

    return(
        <ClockContainer>
            <h1>{hour}</h1>
            <h2>{date}</h2>
        </ClockContainer>
    )
}

export default Clock
