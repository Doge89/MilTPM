import React from 'react'

import HistoryTableRow from './HistoryTableRow'

import { Table, PanelTableCell } from '../../../styles/tpm'

import { maxWidth } from '../../../var'

function HistoryTable({ history, showCard }){

    const handleItem = (idx) => showCard(idx)

    const getCellWidth = (type) => {
        if(type === 'id'){ return window.innerWidth <= maxWidth ? '10%' : '25%' }
        else{ return window.innerWidth <= maxWidth ? '30%' : '25%' }
    }

    return(
        <Table alignItems="center">
            <div className="table">
                <div className="table-row border-none">
                    <PanelTableCell width={getCellWidth('id')} className={`header ${history.length === 0 ? '' : 'border-bottom'}`}>ID</PanelTableCell>
                    <PanelTableCell width={getCellWidth('date')} className={`header border ${history.length === 0 ? '' : 'border-bottom'}`}>Registro</PanelTableCell>
                    <PanelTableCell width={getCellWidth('user')} className={`header border-right ${history.length === 0 ? '' : 'border-bottom'}`}>Usuario</PanelTableCell>
                    <PanelTableCell width={getCellWidth('card')} className={`header ${history.length === 0 ? '' : 'border-bottom'}`}>Tarjeta</PanelTableCell>
                </div>
                {history.map((his, idx) => (
                    <HistoryTableRow 
                        key={idx}
                        idx={idx}
                        length={history.length}
                        handleItem={handleItem}
                        his={his}
                        getCellWidth={getCellWidth}
                    />
                ))}
            </div>
        </Table>
    )
}

export default HistoryTable