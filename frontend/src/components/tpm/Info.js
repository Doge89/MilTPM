import React from 'react'

import { InfoContainer } from '../../styles/tpm'

function Info({ user, line, setLine, lineUser, lines }){

    const handleSelect = e => setLine(e.target.value)

    return(
        <InfoContainer>
            <div>{user}</div>
            <div>Línea: {!lineUser ? (
                <select value={line} onChange={handleSelect} disabled={user !== 'admin'}> 
                    <option>Seleccionar linea</option>
                    {lines.map((line, idx) => (
                        <option value={line} key={idx}>{line}</option>
                    ))}
                </select>
            ): line}</div>
        </InfoContainer>
    )
}

export default Info