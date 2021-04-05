import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import Clock from './Clock'
import SlideMenu from './SlideMenu'
import { useSwipeable } from 'react-swipeable'

import { Image, TopBarContainer, NavbarMobile } from '../../styles/common' 

import TopBarBg from '../../assets/img/topbar.png'
import LayoutImage from '../../assets/img/layout.png'
import TpmImage from '../../assets/img/tpm.png'
import MilwaukeeImage from '../../assets/img/milwaukee.png'
import MpImage from '../../assets/img/mp.png'

function TopBar(){

    const handlers = useSwipeable({
        onSwipedRight: (e) => {
            const position = window.localStorage.getItem('slidePosition')
            if(position === 'left'){
                document.getElementById('clock-slide').style.transform = `translateX(${0}px)`
                document.getElementById('navbar-mobile').style.width = '0'
                window.localStorage.setItem('slidePosition', 'right')
            }
        }
    });

    const history = useHistory()

    const gotoHXH = () => history.push('/hxh')
    const gotoTPM = () => history.push('/tpm')
    const gotoMP = () => history.push('/mp')
    const gotoLayout = () => history.push('/layout')

    useEffect(() => {
        document.getElementById('navbar-mobile').style.height = `${window.innerHeight * 0.9}px`
        document.getElementById('navbar-mobile').style.padding = `${window.innerHeight * 0.05}px 0`
    }, [])

    return(
        <>
        
        <TopBarContainer img={TopBarBg} >
            <nav>
                <Clock id="clock-desktop"/>
                <SlideMenu />
                <Image src={MilwaukeeImage} width='8vw' onClick={gotoHXH} id="logo-mobile"/>
                <div className="row">
                    <Image src={TpmImage} width='8vw' onClick={gotoTPM} />
                    <Image src={MpImage} width='8vw' onClick={gotoMP} />
                    <Image src={LayoutImage} width='8vw' onClick={gotoLayout} />
                    <Image src={MilwaukeeImage} width='12vw' onClick={gotoHXH} />
                </div>
            </nav>
        </TopBarContainer>
        <NavbarMobile id="navbar-mobile" {...handlers}>
            <div id="navbar-content">
                <Clock id="clock-mobile"/>
                <Image src={MilwaukeeImage} width='30vw' onClick={gotoHXH} id="logo-mobile"/>
                <Image src={TpmImage} width='30vw' onClick={gotoTPM} />
                <Image src={MpImage} width='30vw' onClick={gotoMP} />
                <Image src={LayoutImage} width='30vw' onClick={gotoLayout} />
            </div>            
        </NavbarMobile>
        </>
    )
}

export default TopBar;