import React from 'react'

import TableData from './TableData'

import { Row } from '../../../styles/hxh'

function TableRow({ columns, info, idx, length, history, isActual }){

    return(
        <Row 
            borderBottom={idx === length - 1 ? "1px solid rgb(83, 83, 83)" : '0'} 
            id={`${info.start}`} 
            colorBorder={isActual ? "rgb(254, 13, 43)" : "rgb(83, 83, 83)"}
        
        >
            {columns.map((column, i) => (
                <TableData 
                    width={column.width}
                    height="8vh"
                    key={i}
                    subtitles={column.subtitles}
                    subtitlesCentered={column.subtitlesCentered}
                    title={column.title}
                    info={info}
                    idx={idx}
                    history={history}
                    
                />
            ))}
        </Row>
    )
}

export default TableRow