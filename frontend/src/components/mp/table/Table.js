import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import querystring from 'querystring'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

import { Table as TableComponent } from '../../../styles/mp'
import { ButtonPrimary, Container, Text } from '../../../styles/common'

import { URL } from '../../../var'
import { appContext } from '../../../reducers/ProviderMP'

function Table(){

    const history = useHistory()
    const context = useContext(appContext)

    const [err, setErr] = useState(false)
    const [message, setMessage] = useState('')

    const gotoHistory = () => history.push('/mp/historial')

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/mp/post/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const getLine = async () => {
        const res = await axios({
            url: `${URL}/login/validate/`,
            method: 'GET'
        })

        return res.data
    }

    const handleBtn = () => {
        if(checkData()){
            setErr(false)
            const { type, line, technicianChief, superMTTO, superPRDN, reportedBy, machineTag, description, turno, machineType,
                failType, technician, startedAt, endAt, fixedBy, partsUsed, causedBy, timeout, validatedBy, productionAffected } = context
            postData({ data: JSON.stringify({
                tipo: type, linea: line, tecnicoJefe: technicianChief, superMTTO, superPRDN, reportadoPor: reportedBy, tagMaquina: machineTag,
                decripcion: description, tipoFalla: failType, tecnico: technician, iniciadoEn: startedAt, terminadoEn: endAt, arregladoPor: fixedBy,
                refacciones: partsUsed, causa: causedBy, tiempoMuerto: timeout, validadoPor: validatedBy, afectaProduccion: productionAffected ? 1 : 0, 
                turno, tipoMaquina: machineType
            })}).then((data) => {
                console.log(data)
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const checkData = () => {
        const { type, line, technicianChief, superMTTO, superPRDN, reportedBy, machineTag, description,
                failType, technician, startedAt, endAt, fixedBy, partsUsed, causedBy, timeout, validatedBy } = context
        
        if(type === "" || line === "" || technicianChief === "" || superMTTO === "" || superPRDN === "" || reportedBy === "" ||
        machineTag === "" || description === "" || failType === "" || technician === "" || startedAt === "" || endAt === "" ||
        fixedBy === "" || partsUsed === "" || causedBy === "" || timeout === "" || validatedBy === ""){
            setErr(true)
            setMessage('Se tiene que llenar todos los campos')
            return false
        }
        return true
    } 

    useEffect(() => {
        getLine().then(({ linea, Logged }) => {
            if(!Logged){ window.location.replace('/login') }
            context.dispatchLine({ type: 'SET', value: linea })
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return(
        <TableComponent>
            <TableHeader />
            <TableBody />
            {err && <Text color="rgb(254, 13, 46)" size="1.5vw" weight="bold" margin="2vh auto 0 auto">{message}</Text>}
            <Container
                width="100%"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <ButtonPrimary width="20vw" height="4vh" onClick={handleBtn}>Registrar</ButtonPrimary>
                <ButtonPrimary width="20vw" height="4vh" onClick={gotoHistory}>Historial</ButtonPrimary>
            </Container>
        </TableComponent>
    )
}

export default Table