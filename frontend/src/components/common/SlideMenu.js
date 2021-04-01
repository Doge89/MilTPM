import React from 'react'
import { useSwipeable } from 'react-swipeable'

import { ClockSlide } from '../../styles/common'

const width = window.innerWidth

function SlideMenu() {

    const handlers = useSwipeable({
        
        onSwipedLeft: (e) => {
            const position = window.localStorage.getItem('slidePosition')
            if(position === 'right'){
                document.getElementById('clock-slide').style.transform = `translateX(-${width - (width *0.4)}px)`
                document.getElementById('navbar-mobile').style.transform = `translateX(-${width - (width *0.4)}px)`
                window.localStorage.setItem('slidePosition', 'left')
            }
        },
        onSwipedRight: (e) => {
            const position = window.localStorage.getItem('slidePosition')
            if(position === 'left'){
                document.getElementById('clock-slide').style.transform = `translateX(${0}px)`
                document.getElementById('navbar-mobile').style.transform = `translateX(${0}px)`
                window.localStorage.setItem('slidePosition', 'right')
            }
        }
    });

    return (
        <ClockSlide {...handlers} id="clock-slide">
           {'<'} Deslizar
        </ClockSlide>
    )
}

export default SlideMenu
