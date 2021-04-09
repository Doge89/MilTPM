import React from 'react'

import { InfoContainer } from '../../styles/tpm'

function Info({ user, line, setLine, lineUser }){

    const handleSelect = e => setLine(e.target.value)

    return(
        <InfoContainer>
            <div>{user}</div>
            <div>Línea: {!lineUser ? (
                <select value={line} onChange={handleSelect}> 
                    <option>MXC001</option>
                    <option>MXC002</option>
                    <option>MXC003</option>
                </select>
            ): line}</div>
        </InfoContainer>
    )
}

export default Info