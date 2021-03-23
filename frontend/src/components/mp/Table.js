import React from 'react'
import { useHistory } from 'react-router-dom'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

import { Table as TableComponent } from '../../styles/mp'
import { ButtonPrimary, Container } from '../../styles/common'

function Table(){

    const history = useHistory()

    const gotoHistory = () => history.push('/mp/historial')

    return(
        <TableComponent>
            <TableHeader />
            <TableBody />
            <Container
                width="100%"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <ButtonPrimary width="20vw" height="4vh">Registrar</ButtonPrimary>
                <ButtonPrimary width="20vw" height="4vh" onClick={gotoHistory}>Historial</ButtonPrimary>
            </Container>
        </TableComponent>
    )
}

export default Table