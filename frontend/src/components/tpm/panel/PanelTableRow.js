import React, { useState, useContext } from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import { appContext } from '../../../reducers/ProviderTPM'

function PanelTableRow({ idx, activity, last, card, getCellWidth, getSmallCellWidth }){

    const context = useContext(appContext)

    const [status, setStatus] = useState(false)

    const handleStatus = () => {
        if(!card){
            setStatus(!status)
            let newStatus = [...context.status]
            let idx = newStatus.findIndex(status => status.activity === activity.id)
            newStatus[idx].status = !status
            context.dispatchStatus({ type: 'SET', value: newStatus })
        }
    }

    return(
        <div key={idx} className={`table-row ${last ? 'border-none' : ''}`}>
            <PanelTableCell width={getSmallCellWidth()}>{idx + 1}</PanelTableCell>
            <PanelTableCell width={getCellWidth()} className="border">{activity.nombre}</PanelTableCell>
            <PanelTableCell 
                width={`calc(${getSmallCellWidth()} - 4px)`} 
                bgColor={status ? 'green' : 'rgb(254, 13, 46)'} 
                pointer 
                onClick={handleStatus}
                className="cell-status"
            >
                <div className="status-indicator"></div>
            </PanelTableCell>
        </div>
    )
}

export default PanelTableRow