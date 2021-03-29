import React, { useState, useContext } from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import { appContext } from '../../../reducers/ProviderTPM'

function PanelTableRow({ idx, activity, last, card }){

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
            <PanelTableCell width="10%">{idx + 1}</PanelTableCell>
            <PanelTableCell width="80%" className="border">{activity.nombre}</PanelTableCell>
            <PanelTableCell width="calc(10% - 4px)" bgColor={status ? 'green' : 'rgb(254, 13, 46)'} pointer onClick={handleStatus}></PanelTableCell>
        </div>
    )
}

export default PanelTableRow