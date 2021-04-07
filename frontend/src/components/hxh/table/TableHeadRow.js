import React from 'react'

import TableHeader from './TableHeader'

import { Container } from '../../../styles/common'

function TableHeadRow({ columns }){
    return(
        <Container 
            flexDirection="row"
            width="100%"
            margin="0 0 1vh 0"
            className="border-right border-left"
            borderLeft="1px solid white"
            borderRight="1px solid white"
            id="table-header"
        >
            {columns.map((column, idx) => (
                <TableHeader 
                    className={idx === columns.length - 1 ? '' : "border-right"}
                    title={column.title}
                    subtitlesCentered={column.subtitlesCentered}
                    subtitles={column.subtitles}
                    width={column.width}
                    height="8vh"
                    contramedida={column.contramedida}
                    key={idx}
                />
            ))}
        </Container>
    )
}

export default TableHeadRow;