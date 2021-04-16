import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import MainContainer from '../components/common/MainContainer'
import Table from '../components/mp/table/Table'

import { TableContainer } from '../styles/mp'

import { URL } from '../var'
import { setRootStyle } from '../scripts'

function Mp(){

    const history = useHistory()

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        return res.data
    }

    const getLines = async () => {
        const res = await axios({
            url : `${URL}/admin/lineas/`,
            method: 'GET',
        })
        console.log(res.data)
        return res.data
    }

    useEffect(() => {
        setRootStyle(true)
        isLogged().then((data) =>{
            console.log(data)
            if(!data.Logged){ window.location.replace('/login') }
            if(data.priv === "production"){ history.goBack() }
            if(data.priv === "admin"){
                getLines().then(({ lineas }) => {
                    console.log(lineas)
                }).catch(e => console.log(e))
            }
            
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