import React from 'react';
import { useHistory } from 'react-router-dom'

import Clock from './Clock'
import SlideMenu from './SlideMenu'

import { Image, TopBarContainer, NavbarMobile } from '../../styles/common' 

import TopBarBg from '../../assets/img/topbar.png'
import LayoutImage from '../../assets/img/layout.png'
import TpmImage from '../../assets/img/tpm.png'
import MilwaukeeImage from '../../assets/img/milwaukee.png'
import MpImage from '../../assets/img/mp.png'

function TopBar(){

    const history = useHistory()

    const gotoHXH = () => history.push('/hxh')
    const gotoTPM = () => history.push('/tpm')
    const gotoMP = () => history.push('/mp')
    const gotoLayout = () => history.push('/layout')

    return(
        <>
        
        <TopBarContainer img={TopBarBg} >
            <nav>
                <Clock id="clock-desktop"/>
                <SlideMenu />
                <Image src={MilwaukeeImage} width='8vw' onClick={gotoTPM} id="logo-mobile"/>
                <div className="row">
                    <Image src={TpmImage} width='8vw' onClick={gotoTPM} />
                    <Image src={MpImage} width='8vw' onClick={gotoMP} />
                    <Image src={LayoutImage} width='8vw' onClick={gotoLayout} />
                    <Image src={MilwaukeeImage} width='12vw' onClick={gotoHXH} />
                </div>
            </nav>
        </TopBarContainer>
        <NavbarMobile id="navbar-mobile">
            <Clock id="clock-mobile"/>
            <Image src={MilwaukeeImage} width='30vw' onClick={gotoTPM} id="logo-mobile"/>
            <Image src={TpmImage} width='30vw' onClick={gotoTPM} />
            <Image src={MpImage} width='30vw' onClick={gotoMP} />
            <Image src={LayoutImage} width='30vw' onClick={gotoLayout} />
        </NavbarMobile>
        </>
    )
}

export default TopBar;