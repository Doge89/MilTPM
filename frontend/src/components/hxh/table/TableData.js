import React from 'react'

import TableDataHour from './TableDataHour'
import TableDataProduction from './TableDataProduction'
import TableDataFTQ from './TableDataFTQ'
import TableDataStatus from './TableDataStatus'
import TableDataComentarios from './TableDataComentarios'
import TableDataContramedida from './TableDataContramedida'

import { Container } from '../../../styles/common'
import TableDataWorkers from './TableDataWorkers'

function TableData({ width, height, subtitlesCentered, subtitles, title, info, idx, history, deadTimes, userType }){

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
            className="table-row-data"
        >  
            <h1>{title}</h1>
            <div className="data-container">
                {title === "Hora" ? (
                    <TableDataHour 
                        info={{ start: info.start, end: info.end }}
                        getWidthCell={getWidthCell}
                        idx={idx}
                        history={history}
                    />
                ): title === "Producción" ? (
                    <TableDataProduction 
                        getWidthCell={getWidthCell}
                        idx={idx}
                        history={history}
                        deadTimes={deadTimes}
                        userType={userType}
                    />
                ) : title === "FTQ" ? (
                    <TableDataFTQ 
                        getWidthCell={getWidthCell} 
                        idx={idx}
                        history={history}
                    />
                ) : title === "Status" ? (
                    <TableDataStatus 
                        getWidthCell={getWidthCell} 
                        idx={idx}
                        history={history}
                    />
                ) : title === "Comentarios" ? (
                    <TableDataComentarios 
                        getWidthCell={getWidthCell} 
                        idx={idx}
                        history={history}
                    />
                ) : title === "Operarios" ?(
                    <TableDataWorkers 
                        getWidthCell={getWidthCell}
                        idx={idx}
                        history={history}
                    />
                ) : (
                    <TableDataContramedida 
                        getWidthCell={getWidthCell} 
                        idx={idx}
                        history={history}
                    />
                ) }
            </div>
        </Container>
    )
}

export default React.memo(TableData)