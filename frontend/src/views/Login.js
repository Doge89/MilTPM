import React from 'react'

import Form from '../components/login/Form'

import { Container } from '../styles/common'

import { maxWidth } from '../var'

import loginBg from '../assets/img/login-bg.jpeg'
import loginBgMobile from '../assets/img/bg-mobile.png'

function Login(){

    const next = () => window.location.replace('/hxh')

    return(
        <Container
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            className="bg login"
            img={window.innerWidth <= maxWidth ? loginBgMobile : loginBg}
        >
            <Form />
        </Container>
    )
}

export default Login