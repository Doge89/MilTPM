import React from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import { maxWidth } from '../../../var'

function TableItem({ last, report, setReport }) {

    const handleClick = () => setReport(report)

    return ( window.innerWidth <= maxWidth ? (
        <React.Fragment>
            <div className="table-column">
                <PanelTableCell className="header" width="100%">ID</PanelTableCell>
                <PanelTableCell width="20%" className="clickable" onClick={handleClick}>{report.Id}</PanelTableCell>
            </div>
            <div className="table-column">
                <PanelTableCell className="header border" width="100%">Línea</PanelTableCell>
                <PanelTableCell className="border" width="20%">{report.linea}</PanelTableCell>
            </div>
            <div className="table-column">
                <PanelTableCell className="header" width="100%">Área</PanelTableCell>    
                <PanelTableCell width="20%">{report.area}</PanelTableCell>
            </div>
            <div className="table-column">
                <PanelTableCell className="header border" width="100%">Reportado por</PanelTableCell>
                <PanelTableCell className="border" width="20%">{report.nombre}</PanelTableCell>
            </div>
            <div className="table-column">
                <PanelTableCell className="header" width="100%">Valido</PanelTableCell>
                <PanelTableCell width="20%">{report.validado}</PanelTableCell>
            </div>
        </React.Fragment>
        ):(
        <div className={`table-row ${last ? 'border-none' : ''}`}>
            <PanelTableCell width="20%" className="clickable" onClick={handleClick}>{report.Id}</PanelTableCell>
            <PanelTableCell className="border" width="20%">{report.linea}</PanelTableCell>
            <PanelTableCell width="20%">{report.area}</PanelTableCell>
            <PanelTableCell className="border" width="20%">{report.nombre}</PanelTableCell>
            <PanelTableCell width="20%">{report.validado}</PanelTableCell>
        </div>
        )
        
    )
}

export default TableItem
