import React from 'react'

import { InfoContainer } from '../../styles/tpm'

function Info({ user, line }){
    return(
        <InfoContainer>
            <div>{user || 'Admin'}</div>
            <div>Línea: {line}</div>
        </InfoContainer>
    )
}

export default Info