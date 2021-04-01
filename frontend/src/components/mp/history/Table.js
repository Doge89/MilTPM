import React from 'react'

import TableItem from './TableItem'

import { Table as TableContainer, PanelTableCell } from '../../../styles/tpm'
import { Text } from '../../../styles/common'

function Table({ searched, data, setReport }){
    return(
        searched && (
            <TableContainer width="100%" alignItems="center" tableWidth="80%">
                {data.length === 0 ? (
                    <Text color="rgb(254, 13, 46)" size="1.5vw" weight="bold" margin="0 auto">No se ha encontrado ningún reporte que coincida con la busqueda</Text>
                ):(
                    <div className="table">
                        <div className="table-row">
                            <PanelTableCell className="header" width="20%">ID</PanelTableCell>
                            <PanelTableCell className="header border" width="20%">Línea</PanelTableCell>
                            <PanelTableCell className="header" width="20%">Área</PanelTableCell>
                            <PanelTableCell className="header border" width="20%">Reportado por</PanelTableCell>
                            <PanelTableCell className="header" width="20%">Valido</PanelTableCell>
                        </div>
                        {data.map((report, idx) => (
                            <TableItem 
                                report={report}
                                setReport={setReport}
                                last={idx === data.length - 1}
                                key={idx}
                            />
                        ))}
                    </div>
                )}
            </TableContainer>
        )
        
    )
}

export default Table