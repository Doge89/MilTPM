import React, { useState } from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import { maxWidth } from '../../../var'

import pencil from '../../../assets/img/lapiz.png'

function HistoryTableRow({ length, idx, handleItem, his, getCellWidth }){

    const [hover, setHover] = useState(false)

    const onMouseEnter = () => setHover(true)
    const onMouseLeave = () => setHover(false)

    const editItem = () => handleItem(idx)

    const handleItemMobile = () => {
        if(window.innerWidth <= maxWidth){ handleItem(idx) }
    }

    return(
        <div 
            className={`table-row ${length - 1 === idx ? 'border-none' : ''}`} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <PanelTableCell width={getCellWidth('id')} className={hover ? 'hover' : ''} onClick={handleItemMobile} >
                <img src={pencil} alt="Icono de un lapiz" className="img-effect" onClick={editItem}/>
                <div>
                    <span>{his.id}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell width={getCellWidth('date')} className="border">{his.fecha}</PanelTableCell>
            <PanelTableCell width={getCellWidth('user')} className="border-right">{his.usuario}</PanelTableCell>
            <PanelTableCell width={getCellWidth('card')} >{his.tipo ? 'Conforme' : 'No conforme'}</PanelTableCell>
        </div>
    )
}

export default HistoryTableRow