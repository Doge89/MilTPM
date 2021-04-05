import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import CreateUser from './CreateUser'
import ModalMessage from '../../common/ModalMessage'

import { Container, Table, PanelTableCell } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

import trash from '../../../assets/img/basura.png'
import pencil from '../../../assets/img/lapiz.png'

import { URL } from '../../../var'

function Users({ users, setUsers }){

    const [modalOpen ,setModalOpen] = useState(false)
    const [modalOpenDeleteUser ,setModalOpenDeleteUser] = useState(false)
    const [userToDelete, setUserToDelete] = useState({})
    const [userToEdit, setUserToEdit] = useState(null)

    const getUsers = async () => {
        const res = await axios({
            url: `${URL}/tpm/modificar/usuarios/`,
            mehotd: 'GET'
        })

        return res.data
    }

    const deleteUser = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/usuarios/del/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setModalOpen(false)
        setUserToEdit(null)
    }

    const openModalDeleteUser = (user) => {
        setModalOpenDeleteUser(true)
        setUserToDelete(user)
    }
    const closeModalDeleteUser = () => setModalOpenDeleteUser(false)

    const removeUser = () => {
        let newUsers = [...users]
        deleteUser({ id: JSON.stringify(userToDelete.id) }).then(() => {
            newUsers.splice(userToDelete.idx, 1)
            setUsers(newUsers)
            closeModalDeleteUser()
        }).catch(e => console.log(e))
        
    }

    const addUser = user => {
        let newUsers = [...users]
        newUsers.push(user)
        setUsers(newUsers)
    }

    const editUser = (user) => {
        setUserToEdit(user)
        openModal()
    }

    useEffect(() => {
        getUsers().then(({ usuarios }) => {
            const users = JSON.parse(usuarios).map(user => { return { ...user.fields, id: user.pk } })
            console.log(users)
            setUsers(users)
        }).catch(e=> console.log())
    }, [])

    return(
        <Container>
            <Table width="70%">
                <div className="table border-none">
                    <div className="table-row border-none">
                        <PanelTableCell width="33%" className="header border-right border-bottom border-top border-left move-left">Usuario</PanelTableCell>
                        <PanelTableCell width="33%" className="header border-bottom border-right  border-top move-left">Email</PanelTableCell>
                        
                    </div>
                    {users.map((user, idx) => (
                        <div className={`table-row border-none`} key={idx}>
                            <PanelTableCell width="33%" className="border-right border-bottom border-left move-left">
                                <img src={pencil} alt="Icono de un lapiz" className="img-effect" onClick={() => editUser(user)}/>
                                <div>
                                    <span>{user.username}</span>
                                </div>
                            </PanelTableCell>
                            <PanelTableCell width="33%" className="border-right border-bottom move-left">{user.email}</PanelTableCell>
                            <PanelTableCell width="33%" className="header clickable move-left" onClick={() => openModalDeleteUser({...user, idx })}>
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
                addUser={addUser}
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