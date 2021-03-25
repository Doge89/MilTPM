import React from 'react'

import MainContainer from '../components/common/MainContainer'
import Table from '../components/mp/table/Table'

import { TableContainer } from '../styles/mp'

function Mp(){
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