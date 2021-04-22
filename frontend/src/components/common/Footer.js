import React from 'react'

import { Footer as FooterComponent } from '../../styles/common'

import logoControler from '../../assets/img/logo-controler.png'
import fb from '../../assets/img/fb.png'
import insta from '../../assets/img/insta.png'
import qr from '../../assets/img/qr.png'

function Footer() {
    return (
        <FooterComponent>
            <div className="info">
                <img src={logoControler}/>
            </div>
            <div className="info">
                <a href="https://controler.com.mx" target="_blank">www.controler.com.mx</a>
                <a href="https://facebook.com/controler.com.mx/" target="_blank">
                    <img src={fb} />
                    <span>controler.mx</span>
                </a>
                <a href="https://instagram.com/controler.mx/" target="_blank">
                    <img src={insta} />
                    <span>Controler</span>
                </a>
            </div>
            <div className="info">
                <div className="address">
                    <span>Av. Anaconda, No. 168-B, Col. Jerusalén,</span>
                    <span>C.P. 35158, Cd. Lerdo, Durango, México</span>
                </div>
                <img src={qr} id="qr" />
            </div>
        </FooterComponent>
    )
}

export default Footer
