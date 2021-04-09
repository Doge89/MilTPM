import React from 'react'

import { PanelTableCell } from '../../../styles/tpm'

import trash from '../../../assets/img/basura.png'
import pencil from '../../../assets/img/lapiz.png'

import { maxWidth } from '../../../var'

function UserItem({ editUser, openModalDeleteUser, idx, user }) {

    const handleEditUser = () => editUser(user)

    const handleDeleteUser = () => openModalDeleteUser({...user, idx })

    const handleEditUserMobile = () => {
        if(window.innerWidth <= maxWidth){ handleEditUser() }
    }

    return (
        <div className={`table-row border-none`} key={idx}>
            <PanelTableCell width="50%" className="border-right border-bottom border-left move-left" onClick={handleEditUserMobile}>
                <img src={pencil} alt="Icono de un lapiz" className="img-effect" onClick={handleEditUser}/>
                <div>
                    <span>{user.username}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell width="50%" className="border-right border-bottom move-left">{user.email}</PanelTableCell>
            <PanelTableCell width="50%" className="header clickable move-left" onClick={handleDeleteUser}>
                <img src={trash} alt="Icono de un bote de basura" className="trash-icon"/>
                <span className="trash-label">Eliminiar Usuario</span>
            </PanelTableCell>
        </div>
    )
}

export default UserItem
