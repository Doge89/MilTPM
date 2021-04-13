import React, { useState } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import { HistorySearchContainer } from '../../../styles/tpm'
import { ButtonSecondary, Text } from '../../../styles/common'

import { URL } from '../../../var'
import { getDate } from '../../../scripts'

function HistorySearch({ setHistory, machines, notFound, line }){

    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [err, setErr] = useState(false)

    const getCard = async () => {
        const res = await axios({
            url: `${URL}/tpm/historial/get/id/`,
            method: 'POST',
            data: querystring.stringify(JSON.stringify({ id: id, linea: line })),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const handleInput = e => setId(e.target.value)

    const handleBtn = (e) => {
        e.preventDefault()
        setErr(false)
        getCard().then(({ card, usuario, mensaje }) => {
            console.log(mensaje)
            if(mensaje){
                setErr(true)
                setMessage(mensaje) 
                return notFound()
            }
            const machine = machines.find(machine => machine.id === card.maquina)
            setHistory([{...card, fecha: getDate(card.fecha), id, usuario, maquina: machine.nombre }])
        }).catch(e => console.log(e))
    }

    return(
        <>
        <HistorySearchContainer>
            <input 
                value={id} 
                onChange={handleInput}
                placeholder="Folio"
                type="number"
            />
            <ButtonSecondary height="4vh" width="8vw" className="size-effect btn-search" onClick={handleBtn}>Buscar</ButtonSecondary>
        </HistorySearchContainer>
        {err && <Text size="1.5vw" color="rgb(254, 13, 46)" margin="0 0 2vh 0">{message}</Text>}
        </>
    )
}

export default HistorySearch