import React, { useState, useEffect, useContext } from 'react'

import MainContainer from '../components/common/MainContainer'
import Searcher from '../components/mp/history/Searcher'
import Table from '../components/mp/history/Table'
import TableReport from '../components/mp/table/Table'

import { appContext } from '../reducers/ProviderMP'

function MpHistory(){

    const context = useContext(appContext)

    const [data, setData] = useState([])
    const [report, setReport] = useState({})
    const [searched, setSearched] = useState(false)

    useEffect(() => {
        if(JSON.stringify(report) !== "{}"){
            context.dispatchType({ type: 'SET', value: report.tipo })
            context.dispatchTechnicianChief({ type: 'SET', value: report.tecnicoJefe })
            context.dispatchSuperMTTO({ type: 'SET', value: report.superMTTO })
            context.dispatchSuperPRDN({ type: 'SET', value: report.superPRDN })
            context.dispatchReportedBy({ type: 'SET', value: report.reportadoPor })
            context.dispatchMachineType({ type: 'SET', value: report.tipoMaquina })
            context.dispatchMachineTag({ type: 'SET', value: report.tagMaquina })
            context.dispatchDescription({ type: 'SET', value: report.decripcion })
            context.dispatchFailType({ type: 'SET', value: report.tipoFalla })
            context.dispatchProductionAffected({ type: 'SET', value: report.afectaProduccion === 1 ? true : false })
            context.dispatchStartedAt({ type: 'SET', value: report.iniciadoEn })
            context.dispatchEndAt({ type: 'SET', value: report.terminadoEn })
            context.dispatchFixedBy({ type: 'SET', value: report.arregladoPor })
            context.dispatchPartsUsed({ type: 'SET', value: report.refacciones })
            context.dispatchCausedBy({ type: 'SET', value: report.causa })
            context.dispatchTimeout({ type: 'SET', value: report.tiempoMuerto })
            context.dispatchValidatedBy({ type: 'SET', value: report.validadoPor })
            context.dispatchTurno({ type: 'SET', value: report.turno })
        }
    }, [report])

    return(
        <MainContainer>
            <Searcher setData={setData} setSearched={setSearched} />
            <Table searched={searched} data={data} setReport={setReport} />
            {JSON.stringify(report) !== "{}" && (
                <TableReport isHistory />
            )}
        </MainContainer>
    )
}

export default MpHistory