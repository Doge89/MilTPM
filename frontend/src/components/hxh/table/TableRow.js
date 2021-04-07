import React from 'react'

import TableData from './TableData'

import { Row } from '../../../styles/hxh'

function TableRow({ columns, info, idx, length, history }){

    return(
        <Row borderBottom={idx === length - 1 ? "1px solid rgb(83, 83, 83)" : '0'} id={`${info.start}`}>
            {columns.map((column, i) => (
                <TableData 
                    width={column.width}
                    height="10vh"
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