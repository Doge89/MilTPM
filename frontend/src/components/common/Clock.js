import React, { useEffect, useState, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'

import { ClockContainer, ClockSlide } from '../../styles/common'

const width = window.innerWidth

function Clock(){

    let side = true

    const interval = useRef(null)
    const clockSlide = useRef(null)
    const slideAtPosition = useRef(null)

    const handlers = useSwipeable({
        onSwiping: (e) => { 
            console.log(e)
            console.log(side)
            console.log(window.localStorage.getItem('slidePosition'))
            if(clockSlide.current){
                if(e.absX > 0){
                    document.getElementById('clock-slide').style.right = `${e.deltaX * -1}px`
                }
            }else{
                if(e.absX > 0){
                    document.getElementById('clock-slide').style.left = `-${e.deltaX * -1}px`
                }
            }
        },
        onSwipedLeft: (e) => {
            console.log(e)
            const width = window.innerWidth
            console.log(width)
            document.getElementById('clock-slide').style.transform = `translateX(${-1 *(width - e.absX - 150)}px)`
            window.localStorage.setItem('slidePosition', 'left')
        },
        onSwipedRight: (e) => {
            const width = window.innerWidth
            document.getElementById('clock-slide').style.transform = `translateX(${-1 *(width - e.absX - 150)}px)`
            window.localStorage.setItem('slidePosition', 'right')
        }
    });

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre']

    const [hour, setHour] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        window.localStorage.setItem('slidePosition', 'right')
        interval.current = setInterval(() => {
            const date = new Date()
            setDate(`${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`)
            setHour(date.toString().split(' ')[4])
        }, 1000);
        return () => clearInterval(interval.current)
    }, [])

    return(
        <>
        <ClockSlide {...handlers} id="clock-slide">
           {'<'} Deslizar
        </ClockSlide>
        <ClockContainer>
            <h1 >{hour}</h1>
            <h2>{date}</h2>
        </ClockContainer>
        </>
    )
}

export default Clock
