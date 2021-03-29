import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import CSRFToken from '../common/CSRFToken'

import { FormContainer } from '../../styles/login'
import { Text } from '../../styles/common'

import { URL } from '../../var'

function Form(){

    const [err, setErr] = useState(false)
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

    const isLogged = async (data) => {
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

    useEffect(() => {
        isLogged().then((data) => {
            if(data.Logged){ window.location.replace('/hxh') }
        }).catch(e => console.log(e))
    }, [])

    return(
        <FormContainer>
            <h1>INGRESE SUS DATOS</h1>
            <div>
                <label htmlFor="user">Usuario</label>
                <input 
                    value={user}
                    onChange={handleInputUser}
                    id="user"
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input 
                    value={password}
                    onChange={handleInputPass}
                    id="password"
                    type="password"
                />
            </div>  
            <CSRFToken />
            <button onClick={handleBtn}>Ingresar</button>
            {err && <Text color="white" size="1.5vw">{message}</Text>}
        </FormContainer>
    )
}

export default Form