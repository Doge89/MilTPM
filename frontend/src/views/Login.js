import React from 'react'

import Form from '../components/login/Form'

import { Container, Next } from '../styles/common'

import loginBg from '../assets/img/login-bg.jpeg'

function Login(){

    const next = () => window.location.replace('/hxh')

    return(
        <Container
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            className="bg"
            img={loginBg}
        >
            <Form />
            <Next onClick={next}>-></Next>
        </Container>
    )
}

export default Login