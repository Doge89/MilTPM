import React from 'react'

import { PanelTableCell } from '../../../styles/tpm'

function TableItem({ last, report, setReport }) {

    const handleClick = () => setReport(report)

    return (
        <div className={`table-row ${last ? 'border-none' : ''}`}>
            <PanelTableCell width="20%" className="clickable" onClick={handleClick}>{report.Id}</PanelTableCell>
            <PanelTableCell className="border" width="20%">{report.linea}</PanelTableCell>
            <PanelTableCell width="20%">{report.area}</PanelTableCell>
            <PanelTableCell className="border" width="20%">{report.nombre}</PanelTableCell>
            <PanelTableCell width="20%">{report.validado}</PanelTableCell>
        </div>
    )
}

export default TableItem
