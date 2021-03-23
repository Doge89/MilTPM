import React from 'react'

import TableDataHour from './TableDataHour'
import TableDataProduction from './TableDataProduction'
import TableDataFTQ from './TableDataFTQ'
import TableDataStatus from './TableDataStatus'
import TableDataComentarios from './TableDataComentarios'
import TableDataContramedida from './TableDataContramedida'

import { Container } from '../../../styles/common'

function TableData({ width, height, subtitlesCentered, subtitles, title, info, idx, history }){

    const getWidthCell = () => {
        if(subtitlesCentered.length !== 0){
            return `${(100 / (subtitles.length + subtitlesCentered.length)).toFixed(2)}%`
        }else{  return '100%' }
    }

    return(
        <Container
            width={width}
            height={height}
            flexDirection="row"
        >
            {title === "Hora" ? (
                <TableDataHour 
                    info={{ start: info.start, end: info.end, plan: info.plan }}
                    getWidthCell={getWidthCell}
                    idx={idx}
                    history={history}
                />
            ): title === "Producción" ? (
                <TableDataProduction 
                    getWidthCell={getWidthCell}
                    idx={idx}
                    history={history}
                    info={{ start: info.start, end: info.end, actual: info.actual, difference: info.difference, timeout: info.timeout }}
                />
            ) : title === "FTQ" ? (
                <TableDataFTQ 
                    getWidthCell={getWidthCell} 
                    idx={idx}
                    history={history}
                    info={{ start: info.start, end: info.end, actual: info.actual, code: info.code, quantity: info.quantity }}
                />
            ) : title === "Status" ? (
                <TableDataStatus 
                    getWidthCell={getWidthCell} 
                    idx={idx}
                    history={history}
                    info={{ start: info.start, end: info.end, actual: info.actual, description: info.description }}
                />
            ) : title === "Comentarios" ? (
                <TableDataComentarios 
                    getWidthCell={getWidthCell} 
                    idx={idx}
                    history={history}
                    info={{ start: info.start, end: info.end, actual: info.actual, comments: info.comments }}
                />
            ) : (
                <TableDataContramedida 
                    getWidthCell={getWidthCell} 
                    idx={idx}
                    history={history}
                    info={{ start: info.start, end: info.end, actual: info.actual, contramedida: info.contramedida }}
                />
            )}
        </Container>
    )
}

export default React.memo(TableData)