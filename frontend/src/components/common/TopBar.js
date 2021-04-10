import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'

import Clock from './Clock'
import SlideMenu from './SlideMenu'
import { useSwipeable } from 'react-swipeable'

import { Image, TopBarContainer, NavbarMobile } from '../../styles/common' 

import TopBarBg from '../../assets/img/topbar.png'
import LayoutImage from '../../assets/img/layout.png'
import TpmImage from '../../assets/img/tpm.png'
import MilwaukeeImage from '../../assets/img/milwaukee.png'
import MpImage from '../../assets/img/mp.png'

import { URL } from '../../var'

function TopBar(){

    const [userType, setUserType] = useState('')
    const [logged, setLogged] = useState(false)

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

    const logout = async () => {
        const res = await axios({
            url: `${URL}/login/validate/logout/`,
            method: 'GET'
        })

        return res.data
    }

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        console.log(res.data)
        return res.data
    }

    const history = useHistory()

    const gotoHXH = () => {
        console.log(logged)
        if(!logged){ return window.location.replace('/login') }
        if(userType !== 'mantenimiento'){ history.push('/hxh') }
    }
    const gotoTPM = () => {
        if(!logged){ return window.location.replace('/login') }
        history.push('/tpm')
    }
    const gotoMP = () => {
        if(!logged){ return window.location.replace('/login') }
        if(userType !== "production"){ history.push('/mp') }
    }
    const gotoLayout = () => history.push('/layout')

    const handleLogout = () => {
        logout().then(() => {
            window.location.replace('/')
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        document.getElementById('navbar-mobile').style.height = `${window.innerHeight * 0.9}px`
        document.getElementById('navbar-mobile').style.padding = `${window.innerHeight * 0.05}px 0`
        isLogged().then(({ priv, Logged }) => {
            setUserType(priv)
            setLogged(Logged)
            console.log(Logged)
        }).catch(e => console.log(e))
    }, [])

    return(
        <>
        
        <TopBarContainer img={TopBarBg} >
            <nav>
                <div className="clock-container">
                    <FontAwesomeIcon icon={faUserSlash} color="white" onClick={handleLogout} />
                    <Clock id="clock-desktop"/>
                    <SlideMenu />
                    <Image src={MilwaukeeImage} width='8vw' onClick={gotoHXH} id="logo-mobile"/>
                </div>
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