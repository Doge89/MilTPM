import React, { useState, useEffect } from 'react'

import Selector from '../Selector'
import Users from './Users'
import Schedule from './Schedule'
import Ports from './Ports'
import ConfLine from './ConfLine'

import { Container } from '../../../styles/tpm'

import { modifyViews } from '../../../var'

function Modify({ machines, schedule, lines }){

    const [modifyView, setModifyView] = useState(modifyViews[0])
    const [users, setUsers] = useState([{ user: 'Administrador', type: 'admin' }])

    useEffect(() => {
        
    }, [modifyView])

    return(
        <Container>
            <Selector 
                machines={modifyViews}
                machineSelected={modifyView}
                setMachine={setModifyView}
                title=""
            />
            {modifyView.value === 'user' ? (
                <Users 
                    users={users}
                    setUsers={setUsers}
                />
            ): modifyView.value === 'schedule' ? (
                <Schedule 
                    machines={machines}
                    schedule={schedule}
                />
            ): modifyView.value === "port" ? (
                <Ports />
            ): 
                <ConfLine 
                    lines={lines}
                    users={users}
                />
            }
        </Container>
    )
}

export default Modify