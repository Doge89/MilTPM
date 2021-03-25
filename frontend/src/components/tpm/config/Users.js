import React, { useState } from 'react'

import CreateUser from './CreateUser'
import ModalMessage from '../../common/ModalMessage'

import { Container, Table, PanelTableCell } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

import trash from '../../../assets/img/basura.png'
import pencil from '../../../assets/img/lapiz.png'

function Users({ users, setUsers }){

    const [modalOpen ,setModalOpen] = useState(false)
    const [modalOpenDeleteUser ,setModalOpenDeleteUser] = useState(false)
    const [userID, setUserID] = useState(0)
    const [userToEdit, setUserToEdit] = useState(null)

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setModalOpen(false)
        setUserToEdit(null)
    }

    const openModalDeleteUser = (idx) => {
        setModalOpenDeleteUser(true)
        setUserID(idx)
    }
    const closeModalDeleteUser = () => setModalOpenDeleteUser(false)

    const removeUser = () => {
        let newUsers = [...users]
        newUsers.splice(userID, 1)
        setUsers(newUsers)
        closeModalDeleteUser()
    }

    const editUser = (user) => {
        setUserToEdit(user)
        openModal()
    }

    return(
        <Container>
            <Table width="70%">
                <div className="table border-none">
                    <div className="table-row border-none">
                        <PanelTableCell width="33%" className="header border-right border-bottom border-top border-left move-left">Usuario</PanelTableCell>
                        <PanelTableCell width="33%" className="header border-bottom border-right  border-top move-left">Tipo</PanelTableCell>
                        
                    </div>
                    {users.map((user, idx) => (
                        <div className={`table-row border-none`} key={idx}>
                            <PanelTableCell width="33%" className="border-right border-bottom border-left move-left">
                                <img src={pencil} alt="Icono de un lapiz" className="img-effect" onClick={() => editUser(user)}/>
                                <div>
                                    <span>{user.user}</span>
                                </div>
                            </PanelTableCell>
                            <PanelTableCell width="33%" className="border-right border-bottom move-left">{user.type}</PanelTableCell>
                            <PanelTableCell width="33%" className="header clickable move-left" onClick={() => openModalDeleteUser(idx)}>
                                <img src={trash} alt="Icono de un bote de basura"/>
                                <span>Eliminiar Usuario</span>
                            </PanelTableCell>
                        </div>
                    ))}
                </div>
            </Table>
            <CreateUser 
                modalOpen={modalOpen}
                closeModal={closeModal}
                userToEdit={userToEdit}
            />
            <ModalMessage 
                title="Eliminar Usuario"
                text="¿Está seguro que desea eliminar a este usuario?"
                modalOpen={modalOpenDeleteUser}
                closeModal={closeModalDeleteUser}
                success={removeUser}
                cancel={closeModalDeleteUser}
            />
            <ButtonPrimary width="15vw" height="4vh" onClick={openModal}>Crear Usuario</ButtonPrimary>
        </Container>
    )
}

export default Users