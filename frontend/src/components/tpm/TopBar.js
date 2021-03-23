import React from 'react'
import axios from 'axios'

import { TopBar as TopBarComponent, TopBarItem } from '../../styles/tpm'

import { URL } from '../../var'

function TopBar({ setViewType, viewType }){

    const gotoPanel = () => setViewType('panel')
    const gotoHistory = () => setViewType('history')
    const gotoModify = () => setViewType('modify')

    const logout = async () => {
        const res = await axios({
            url: `${URL}/logout/`,
            method: 'GET'
        })

        return res.data
    }

    const handleLogout = () => {
        logout().then(() => {
            window.location.replace('/')
        }).catch(e => {
            console.log(e)
        })
    }

    return(
        <TopBarComponent>
            <TopBarItem onClick={gotoPanel} hover={viewType === 'panel'}>Panel</TopBarItem>
            <TopBarItem onClick={gotoHistory} hover={viewType === 'history'}>Historial</TopBarItem>
            <TopBarItem onClick={gotoModify} hover={viewType === 'modify'}>Configuración</TopBarItem>
            <TopBarItem onClick={handleLogout}>Cerrar sesión</TopBarItem>
        </TopBarComponent> 
    )
}

export default TopBar