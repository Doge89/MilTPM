import React, { useEffect } from 'react'

import { PanelTableCell } from '../../styles/tpm'

function StaffItem({ key, name, idx, date, hour, viewType }){

    useEffect(() =>{
        if(key && key !== ""){
            console.info(key)
        }
    }, [])

    return(
        <div className="table-row border-none" key={idx}>
            <PanelTableCell width="50%" className="border-right border-bottom border-left move-left">
                <div>
                    <span>{viewType === "Register" ? key : name}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell width="50%" className="border-right border-bottom move-left email">{viewType === "Register" ? name : `${date} ${hour}`}</PanelTableCell>
        </div>
    )

}

export default StaffItem