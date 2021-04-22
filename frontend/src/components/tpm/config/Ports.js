import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import { Container, CardInfo } from '../../../styles/tpm'
import { ButtonPrimary, Text } from '../../../styles/common'

import { URL } from '../../../var'

function Ports(){

    const [port, setPort] = useState('COM1')
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [err, setErr] = useState(false)

    const handleSelect = e => setPort(e.target.value)

    const savePort = async () => {
        const res = await axios({
            url: `${URL}/tpm/modificar/puerto/`,
            method: 'POST',
            data: querystring.stringify({ com: port }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const getPort = async () => {
        const res = await axios({
            url: `${URL}/tpm/modificar/puerto/`,
            method: 'GET',
        })

        return res.data
    }

    const handleBtn = () => {
        setShowMessage(false)
        savePort().then(() => {
            setErr(false)
            setShowMessage(true)
            setMessage('Se ha actulizado correctamente el puerto')
        }).console.log(e => {
            console.log(e)
            setErr(true)
            setShowMessage(true)
            if(e.response?.status === 500){ setMessage('No se ha podido actualizar el puerto debido a un error en el servidor') }
        })
    }

    const setValuePort = () => {
        getPort().then(({ puerto }) => {
            setPort(puerto)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        setValuePort()
    }, [])

    return(
        <Container padding="2vh 10%">
            <CardInfo widthLabel="20vw">
                <label id="label-ports">Seleccione un puerto: </label>
                <select value={port} onChange={handleSelect}>
                    <option>COM1</option>
                    <option>COM2</option>
                    <option>COM3</option>
                    <option>COM4</option>
                    <option>COM5</option>
                    <option>COM6</option>
                    <option>COM7</option>
                    <option>COM8</option>
                    <option>COM9</option>
                    <option>COM10</option>
                </select>
            </CardInfo>
            <ButtonPrimary width="15vw" height="4vh" onClick={handleBtn}>Cambiar puerto</ButtonPrimary>
            {showMessage && <Text color={err ? 'rgb(254, 13, 46)':'green'}>{message}</Text>}
        </Container>
    )
}

export default Ports