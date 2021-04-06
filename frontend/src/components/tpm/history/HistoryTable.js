import React from 'react'

import HistoryTableRow from './HistoryTableRow'

import { Table, PanelTableCell } from '../../../styles/tpm'

function HistoryTable({ history, showCard }){

    const handleItem = (idx) => showCard(idx)

    return(
        <Table alignItems="center">
            <div className="table">
                <div className="table-row">
                    <PanelTableCell width="25%" className="header">ID</PanelTableCell>
                    <PanelTableCell width="25%" className="header border">Registro</PanelTableCell>
                    <PanelTableCell width="25%" className="header border-right">Usuario</PanelTableCell>
                    <PanelTableCell width="25%" className="header">Tarjeta</PanelTableCell>
                </div>
                {history.map((his, idx) => (
                    <HistoryTableRow 
                        key={idx}
                        idx={idx}
                        length={history.length}
                        handleItem={handleItem}
                        his={his}
                    />
                ))}
            </div>
        </Table>
    )
}

export default HistoryTable