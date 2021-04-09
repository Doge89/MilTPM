import bgMobile from './assets/img/bg-mobile.png'

import { maxWidth } from './var'

export const twoDigits = number => number < 10 ? `0${number}` : number

export const getDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${twoDigits(newDate.getHours())}:${twoDigits(newDate.getMinutes())}`
}

export const setRootStyle = () => {
    document.getElementById('app').style.overflowY = 'auto'
    if(window.innerWidth <= maxWidth){
        console.log(bgMobile)
        document.getElementById('root').style.backgroundColor = 'rgb(30, 30, 30)'
        document.getElementById('root').style.backgroundImage = `url(${bgMobile})`
        document.getElementById('root').style.backgroundSize = 'contain'
        document.getElementById('root').style.backgroundRepeat = 'no-repeat'
        document.getElementById('root').style.backgroundPosition = 'center'
        document.getElementsByTagName('body')[0].style.overflowX = 'hidden'

        document.getElementById('app').style.backgroundColor = 'rgba(0,0,0,0.7)'

    }
}