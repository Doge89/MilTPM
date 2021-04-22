import React from 'react'
import { useSwipeable } from 'react-swipeable'

import { ClockSlide } from '../../styles/common'

import clock from '../../assets/img/clock.png'

const width = window.innerWidth

function SlideMenu() {

    const handlers = useSwipeable({
        
        onSwipedLeft: (e) => {
            const position = window.localStorage.getItem('slidePosition')
            if(position === 'right'){
                document.getElementById('clock-slide').style.transform = `translateX(-${width - (width *0.4)}px)`
                document.getElementById('navbar-mobile').style.width = '60vw'
                window.localStorage.setItem('slidePosition', 'left')
            }
        },
        onSwipedRight: (e) => {
            const position = window.localStorage.getItem('slidePosition')
            if(position === 'left'){
                document.getElementById('clock-slide').style.transform = `translateX(${0}px)`
                document.getElementById('navbar-mobile').style.width = '0'
                window.localStorage.setItem('slidePosition', 'right')
            }
        }
    });

    return (
        <ClockSlide {...handlers} id="clock-slide">
           <span>{'<'} Deslizar</span>
           <img src={clock} alt="icono de un reloj" />
        </ClockSlide>
    )
}

export default SlideMenu
