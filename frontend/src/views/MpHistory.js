import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import MainContainer from '../components/common/MainContainer'
import Searcher from '../components/mp/history/Searcher'
import Table from '../components/mp/history/Table'
import TableReport from '../components/mp/table/Table'

import { HistoryTableContainer } from '../styles/mp'

import { appContext } from '../reducers/ProviderMP'

import { URL } from '../var'
import { setRootStyle } from '../scripts'

function MpHistory(){

    const history = useHistory()
    const context = useContext(appContext)

    const [data, setData] = useState([])
    const [report, setReport] = useState({})
    const [searched, setSearched] = useState(false)
    const [lines, setLines] = useState([])

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
        
        return res.data
    }

    useEffect(() => {
        setRootStyle(true)
        if(JSON.stringify(report) !== "{}"){
            context.dispatchType({ type: 'SET', value: report.area })
            context.dispatchTechnician({ type: 'SET', value: report.tecnico })
            context.dispatchTechnicianChief({ type: 'SET', value: report.tecnicoJefe })
            context.dispatchSuperMTTO({ type: 'SET', value: report.superMTTO })
            context.dispatchSuperPRDN({ type: 'SET', value: report.superPRDN })
            context.dispatchReportedBy({ type: 'SET', value: report.nombre })
            context.dispatchMachineType({ type: 'SET', value: report.tipoMaquina })
            context.dispatchMachineTag({ type: 'SET', value: report.tagMaquina })
            context.dispatchDescription({ type: 'SET', value: report.descripcion })
            context.dispatchFailType({ type: 'SET', value: report.tipoFalla })
            context.dispatchProductionAffected({ type: 'SET', value: report.afecta })
            context.dispatchStartedAt({ type: 'SET', value: report.horaInicio })
            context.dispatchEndAt({ type: 'SET', value: report.horaFinal })
            context.dispatchFixedBy({ type: 'SET', value: report.reparacion })
            context.dispatchPartsUsed({ type: 'SET', value: report.refacciones })
            context.dispatchCausedBy({ type: 'SET', value: report.causa })
            context.dispatchTimeout({ type: 'SET', value: report.tiempoMuerto })
            context.dispatchValidatedBy({ type: 'SET', value: report.validado })
            context.dispatchTurno({ type: 'SET', value: report.turno })
        }
    }, [report])

    useEffect(() => {
        setRootStyle(true)
        isLogged().then((data) =>{
            if(!data.Logged){ return window.location.replace('/login') }
            if(data.priv === "production"){ return history.goBack() }
            getLines().then(({ lineas }) => {
                const lines = JSON.parse(lineas).map(item => item.fields.linea)
                setLines(lines)
            }).catch(e => console.log(e))
        }).catch(e => { console.log(e) })
    }, [])

    return(
        <MainContainer>
            <Searcher setData={setData} setSearched={setSearched} searched={searched} />
            <Table 
                searched={searched} 
                data={data} 
                setReport={setReport} 
                seeReport={JSON.stringify(report) !== "{}"}
             />
            {JSON.stringify(report) !== "{}" && (
                <HistoryTableContainer>
                    <TableReport isHistory lines={lines} />
                </HistoryTableContainer>
            )}
        </MainContainer>
    )
}

export default MpHistory