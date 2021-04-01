import React, { useState, useEffect, useContext } from 'react'

import MainContainer from '../components/common/MainContainer'
import Searcher from '../components/mp/history/Searcher'
import Table from '../components/mp/history/Table'
import TableReport from '../components/mp/table/Table'

import { HistoryTableContainer } from '../styles/mp'

import { appContext } from '../reducers/ProviderMP'

function MpHistory(){

    const context = useContext(appContext)

    const [data, setData] = useState([])
    const [report, setReport] = useState({})
    const [searched, setSearched] = useState(false)

    useEffect(() => {
        if(JSON.stringify(report) !== "{}"){
            console.log(report)
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

    return(
        <MainContainer>
            <Searcher setData={setData} setSearched={setSearched} />
            <Table searched={searched} data={data} setReport={setReport} />
            {JSON.stringify(report) !== "{}" && (
                <HistoryTableContainer>
                    <TableReport isHistory />
                </HistoryTableContainer>
            )}
        </MainContainer>
    )
}

export default MpHistory