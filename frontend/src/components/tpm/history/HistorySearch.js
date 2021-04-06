import React, { useState } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import { HistorySearchContainer } from '../../../styles/tpm'
import { ButtonSecondary } from '../../../styles/common'

import { URL } from '../../../var'

function HistorySearch({ setHistory }){

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

    const handleBtn = () => {
        getCard().then(({ card }) => {
            console.log(card)
            setHistory([card])
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