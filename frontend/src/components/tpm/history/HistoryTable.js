import React from 'react'

import HistoryTableRow from './HistoryTableRow'

import { Table, PanelTableCell } from '../../../styles/tpm'

function HistoryTable({ history, showCard }){

    const handleItem = (idx) => showCard(idx)

    return(
        <Table alignItems="center">
            <div className="table">
                <div className="table-row border-none">
                    <PanelTableCell width="25%" className={`header ${history.length === 0 ? '' : 'border-bottom'}`}>ID</PanelTableCell>
                    <PanelTableCell width="25%" className={`header border ${history.length === 0 ? '' : 'border-bottom'}`}>Registro</PanelTableCell>
                    <PanelTableCell width="25%" className={`header border-right ${history.length === 0 ? '' : 'border-bottom'}`}>Usuario</PanelTableCell>
                    <PanelTableCell width="25%" className={`header ${history.length === 0 ? '' : 'border-bottom'}`}>Tarjeta</PanelTableCell>
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