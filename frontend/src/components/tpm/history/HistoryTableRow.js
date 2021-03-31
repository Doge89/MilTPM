import React, { useState } from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import pencil from '../../../assets/img/lapiz.png'

function HistoryTableRow({ length, idx, handleItem, his }){

    const [hover, setHover] = useState(false)

    const onMouseEnter = () => setHover(true)
    const onMouseLeave = () => setHover(false)

    return(
        <div 
            className={`table-row ${length - 1 === idx ? 'border-none' : ''}`} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <PanelTableCell width="20%" className={hover ? 'hover' : ''} >
                <img src={pencil} alt="Icono de un lapiz" className="img-effect" onClick={() => handleItem(idx)}/>
                <div>
                    <span>{his.id}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell width="20%" className="border">{his.fecha}</PanelTableCell>
            <PanelTableCell width="20%">{his.usuario}</PanelTableCell>
            <PanelTableCell width="20%" className="border">{his.tipo ? 'Conforme' : 'No conforme'}</PanelTableCell>
            <PanelTableCell width="20%">{his.maquina}</PanelTableCell>
        </div>
    )
}

export default HistoryTableRow