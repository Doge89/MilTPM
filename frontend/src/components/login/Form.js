import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import CSRFToken from '../common/CSRFToken'

import { FormContainer } from '../../styles/login'

import { URL, maxWidth } from '../../var'

import logo from '../../assets/img/milwaukee.png'

function Form(){

    const [err, setErr] = useState(false)
    const [isMobile, setisMobile] = useState(false)
    const [keyboeardOpen, setKeyboeardOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('') 

    const handleInputUser = e => setUser(e.target.value)
    const handleInputPass = e => setPassword(e.target.value)

    const login = async (data) => {
        const res = await axios({
            url : `${URL}/login/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        return res.data
    }

    const handleBtn = (e) => {
        e.preventDefault()
        if(user !== '' && password !== ''){
            setErr(false)
            login({ user, password }).then((data) =>{
                window.location.replace('/hxh')
            }).catch(e => {
                setErr(true)
                if(e.response.status === 401){ setMessage('Usuario o contraseña incorrectos') }
                else{ setMessage('No se ha podido iniciar sesión debido a un error en el servidor') }
            })
        }
    }

    const resize = () => {
        if(window.screen.width > maxWidth){ setisMobile(false) }
        else{ setisMobile(true) }
    }

    const seeInputUser = () => {
        if(window.innerWidth <= maxWidth){
            document.getElementById('user').scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleOpenKeyboard = () => {
        if(window.innerWidth <= maxWidth){
            console.log('a')
            setKeyboeardOpen(true)
        }
    }

    const handleCloseKeyboard = () => {
        if(window.innerWidth <= maxWidth){
            console.log('a')
            setKeyboeardOpen(false)
        }
    }

    useEffect(() => {
        resize()
        window.addEventListener('resize', resize)
        isLogged().then((data) => {
            if(data.Logged){ window.location.replace('/hxh') }
        }).catch(e => console.log(e))
        

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return(
        <FormContainer padding='5% 0 10% 0'> 
            <div id="logo-mobile">
                <img src={logo} />
            </div>
            <h1>{isMobile ? 'INICIA SESIÓN' : 'INGRESE SUS DATOS'}</h1>
            <div id="mobile-title">Ingresar datos</div>
            <div>
                <label htmlFor="user">Usuario</label>
                <input 
                    value={user}
                    onChange={handleInputUser}
                    id="user"
                    onFocus={handleOpenKeyboard}
                    onBlur={handleCloseKeyboard}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input 
                    value={password}
                    onChange={handleInputPass}
                    id="password"
                    type="password"
                    onFocus={handleOpenKeyboard}
                    onBlur={handleCloseKeyboard}
                />
            </div>  
            <CSRFToken />
            <button onClick={handleBtn}>Ingresar</button>
            {err && <span color="white" size="1.5vw">{message}</span>}
        </FormContainer>
    )
}

export default Form