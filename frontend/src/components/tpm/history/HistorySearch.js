import React, { useState } from 'react'

import { HistorySearchContainer } from '../../../styles/tpm'
import { ButtonSecondary } from '../../../styles/common'

function HistorySearch(){

    const [id, setId] = useState('')

    const handleInput = e => setId(e.target.value)

    return(
        <HistorySearchContainer>
            <input 
                value={id}
                onChange={handleInput}
                placeholder="Folio"
                type="number"
            />
            <ButtonSecondary height="4vh" width="8vw" className="size-effect">Buscar</ButtonSecondary>
        </HistorySearchContainer>
    )
}

export default HistorySearch