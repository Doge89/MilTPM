import React, { useEffect } from 'react'
import axios from 'axios'

import MainContainer from '../components/common/MainContainer'
import Table from '../components/mp/table/Table'

import { TableContainer } from '../styles/mp'

import { URL } from '../var'
import { setRootStyle } from '../scripts'

function Mp(){

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        return res.data
    }

    useEffect(() => {
        setRootStyle(true)
        isLogged().then((data) =>{
            //if(!data.Logged){ window.location.replace('/login') }
            
        }).catch(e => { console.log(e) })
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