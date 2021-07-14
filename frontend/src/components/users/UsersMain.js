import React, { useState } from 'react'

import UsersOption from './UsersOption'

import { UserContainer } from '../../styles/users'

function UsersMain(){

    const [ viewType, setViewType ] = useState('Registro')

    return (

        <UserContainer>
            <UsersOption 
                setViewType={setViewType}
            />
            {viewType === "Registro" ? (
                <p>Registro</p>
            ) : viewType === "Entrada" ? (
                <p>Entrada</p>
            ): (
                <p>Salida</p>
            )}
        </UserContainer>

    )
}

export default UsersMain