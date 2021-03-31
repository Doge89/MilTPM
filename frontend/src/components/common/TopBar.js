import React from 'react';
import { useHistory } from 'react-router-dom'

import Clock from './Clock'

import { Image, TopBarContainer } from '../../styles/common' 

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
        <TopBarContainer img={TopBarBg} >
            <nav>
                <Clock />
                <Image src={MilwaukeeImage} width='8vw' onClick={gotoTPM} id="logo-mobile"/>
                <div className="row">
                    <Image src={TpmImage} width='8vw' onClick={gotoTPM} />
                    <Image src={MpImage} width='8vw' onClick={gotoMP} />
                    <Image src={LayoutImage} width='8vw' onClick={gotoLayout} />
                    <Image src={MilwaukeeImage} width='15vw' onClick={gotoHXH} />
                </div>
            </nav>
        </TopBarContainer>
    )
}

export default TopBar;