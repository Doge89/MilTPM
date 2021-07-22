import React, { useEffect, useState } from 'react'
import axios from 'axios'

import QueryColumn from './QueryColumn'
import { QueryForm } from '../../styles/users'

function UserFilter({  }){

    const labels = ["Obtener el: ", "Ordenar por: ", "Ordenar: "]

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