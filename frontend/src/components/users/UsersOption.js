import React, { useState } from 'react'

import { UserOption } from '../../styles/users'

function UsersOption({ setViewType }){

    const labels = ['Registro', 'Entrada', 'Salida', 'Resumen']

    const handleClick = (e) => {
        switch(e.target.innerHTML){
            case "Salida": return setViewType("Salida")
            case "Entrada": return setViewType("Entrada")
            case "Resumen" : return setViewType("Resumen")
            default: return setViewType("Registro")
        }
    }

    return (

        <UserOption
            marginTop = "20px"
            padding="10px"
        >
            {labels.map((label, idx) => (
                <div
                    border="1px solid rgba(0, 0, 0, 0.5)"
                    key={idx}
                >
                    <span
                        onClick={handleClick}
                    >
                        {label}
                    </span>
                </div>
            ))}
        </UserOption>

    )

}

export default UsersOption