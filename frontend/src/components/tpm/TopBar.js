import React from 'react'

import { TopBar as TopBarComponent, TopBarItem } from '../../styles/tpm'

function TopBar({ setViewType, viewType, user }){

    const gotoPanel = () => setViewType('panel')
    const gotoHistory = () => {
        if(user === "admin"){ setViewType('history') }
    }
    const gotoModify = () => {
        if(user === "admin"){ setViewType('modify') }
    }

    return(
        <TopBarComponent>
            <TopBarItem onClick={gotoPanel} hover={viewType === 'panel'}>Panel</TopBarItem>
            <TopBarItem onClick={gotoHistory} hover={viewType === 'history'}>Historial</TopBarItem>
            <TopBarItem onClick={gotoModify} hover={viewType === 'modify'}>Configuración</TopBarItem>
        </TopBarComponent> 
    )
}

export default TopBar