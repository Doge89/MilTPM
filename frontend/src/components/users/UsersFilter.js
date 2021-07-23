import React from 'react'

import QueryColumn from './QueryColumn'
import { QueryForm } from '../../styles/users'

function UserFilter({  }){

    const labels = ["Obtener el: ", "Ordenar por: ", "Ordenar: ", "Operarios: "]

    return(

        <>
        <QueryForm>
            {labels.map((label, idx) => (
                <QueryColumn 
                    idx={idx}
                    key={idx}
                    title={label}
                />
            ))}
        </QueryForm>
        </>

    )

}

export default UserFilter