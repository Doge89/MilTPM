import React from 'react'

import TableData from './TableData'

import { Row } from '../../../styles/hxh'

function TableRow({ columns, info, idx, length, history, isActual, borderColor, deadTimes, userType }){

    return(
        <Row 
            borderBottom={idx === length - 1 ? "1px solid rgb(83, 83, 83)" : '0'} 
            id={`${info.start}`} 
            colorBorder={isActual ? borderColor : "rgb(133, 133, 133)"}
        
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
                    deadTimes={deadTimes} 
                    userType={userType}
                />
            ))}
        </Row>
    )
}

export default TableRow