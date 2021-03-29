import React, { useState, useEffect, useContext } from 'react'

import PanelTableRow from './PanelTableRow'

import { Table, PanelTableCell } from '../../../styles/tpm'

import { appContext } from '../../../reducers/ProviderTPM'

function PanelTable({ machine, activities, card }){

    const context = useContext(appContext)

    const [activityTypes, setActivityTypes] = useState([])

    useEffect(() => {
        const activityTypes = []
        const status = []
        for(let i = 0; i < activities.length; i++){
            if(!activityTypes.some(activityType => activityType === activities[i].tipo)){
                activityTypes.push(activities[i].tipo)
            }
            status.push({ status: false, activity: activities[i].id, activityName: activities[i].nombre })
        }
        setActivityTypes(activityTypes)
        context.dispatchStatus({ type: 'SET', value: status })
    }, [activities])

    return(
        <Table>
            <div className="machine">{ machine.nombre }</div> 
            {activityTypes.map((activityType, idx) => (
                <div className="table margin" key={idx}>
                    <div className="table-header">{activityType.slice(0, 1).toUpperCase() + activityType.slice(1, activityType.length)}</div>
                    <div className="table-row">
                        <PanelTableCell width="10%" className="header">No.</PanelTableCell>
                        <PanelTableCell width="80%" className="header border">Actividad</PanelTableCell>
                        <PanelTableCell width="10%" className="header">OK</PanelTableCell>
                    </div>
                    {activities.filter(activity => activity.tipo === activityType).map((activity, idx) => (
                        <PanelTableRow 
                            idx={idx}
                            activity={activity}
                            last={activities.filter(activity => activity.tipo === activityType).length - 1 === idx}
                            key={idx}
                            card={card}
                        />
                    ))}
                </div>
            ))}
        </Table>
    )
}

export default PanelTable