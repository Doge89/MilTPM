import React, { useState } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import { HistorySearchContainer } from '../../../styles/tpm'
import { ButtonSecondary } from '../../../styles/common'

import { URL } from '../../../var'
import { getDate } from '../../../scripts'

function HistorySearch({ setHistory, machines }){

    const [id, setId] = useState('')

    const getCard = async () => {
        const res = await axios({
            url: `${URL}/tpm/historial/get/id/`,
            method: 'POST',
            data: querystring.stringify({ id: id })
        })

        return res.data
    }

    const handleInput = e => setId(e.target.value)

    const handleBtn = (e) => {
        e.preventDefault()
        getCard().then(({ card, usuario }) => {
            console.log(card)
            const machine = machines.find(machine => machine.id === card.maquina)
            setHistory([{...card, fecha: getDate, id, usuario, maquina: machine }])
        }).catch(e => console.log(e))
    }

    return(
        <HistorySearchContainer>
            <input 
                value={id}
                onChange={handleInput}
                placeholder="Folio"
                type="number"
            />
            <ButtonSecondary height="4vh" width="8vw" className="size-effect" onClick={handleBtn}>Buscar</ButtonSecondary>
        </HistorySearchContainer>
    )
}

export default HistorySearch