import React, { useEffect } from 'react'

import MainContainer from '../components/common/MainContainer'
import Table from '../components/mp/table/Table'

import { TableContainer } from '../styles/mp'

import { maxWidth } from '../var'

function Mp(){

    useEffect(() => {
        document.getElementById('root').style.overflowY = 'auto'
        if(window.innerWidth < maxWidth){ document.getElementById('root').style.backgroundColor = 'black' }
    }, [])

    return(
        <MainContainer>
            <TableContainer>
                <h1>REGISTRO DE FALLAS Y TIEMPO MUERTO DE MANTENIMIENTO</h1>
                <Table />
            </TableContainer>
        </MainContainer>
    )
}

export default Mp;