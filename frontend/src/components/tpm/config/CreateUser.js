import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import querystring from 'querystring'

import { CreateUserForm, CardInfo  } from '../../../styles/tpm'
import { ButtonPrimary, Text, ModalContainer } from '../../../styles/common'

import { URL } from '../../../var'
 
const customStyles = {
    content : {
        top                   : '15%',
        left                  : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : '40%',
        height                : '70%' 
    },
    overlay:{
        zIndex                : 2
    }
};

Modal.setAppElement('#root')

function CreateUser({ modalOpen, closeModal, userToEdit, addUser }){

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [line, setLine] = useState('')
    const [email, setEmail] = useState('')
    const [typeUser, setTypeUser] = useState('admin')
    const [err, setErr] = useState(false)

    const handleInputUser = e => setUser(e.target.value)
    const handleInpuPassword = e => setPassword(e.target.value)
    const handleInputLine = e => setLine(e.target.value)
    const handleInputEmail = e => setEmail(e.target.value)
    const handleInpuConfirmPassword = e => setConfirmPassword(e.target.value)
    const handleSelect = e => setTypeUser(e.target.value)

    const handleCloseModal = () => {
        setUser('')
        setPassword('')
        setConfirmPassword('')
        setTypeUser('admin')
        closeModal()
    }

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/usuarios/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const updateData = async (data) => {
        const res = await axios({
            url: `${URL}/users`,
            method: 'PUT',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const checkData = () =>{
        setErr(false)
        if(!user || !password || !line || !email){
            setErr(true)
            setMessage('No puede dejar campos en blanco')
            return false
        }else if(password !== confirmPassword){
            setErr(true)
            setMessage('Las contraseñas no coinciden')
            return false
        }
        return true
    }

    const handleBtn = (e) => {
        e.preventDefault()
        if(checkData()){
            if(userToEdit){
                updateData({ user, password, typeUser }).then(() => {

                }).catch(e => console.log(e))
            }else{
                postData({data: JSON.stringify({ user, password, tipoUsuario: typeUser, linea: line, email })})
                .then(({ usuario }) => {
                    addUser({ id: usuario.id, email: usuario.email, linea: usuario.linea, username: usuario.username })
                    closeModal()    
                }).catch(e => console.log(e))
            }
        }
    }

    useEffect(() => {
        if(userToEdit){
            setUser(userToEdit.username)
            setTypeUser(userToEdit.type)
            setEmail(userToEdit.email)
            setLine(userToEdit.linea)
        }
        return () => {
            setUser('')
            setTypeUser('')
        }
    }, [userToEdit])

    return(
        <Modal
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
        >
            <ModalContainer>
                <CreateUserForm>
                    <h1>Crear Usuario</h1>
                    <CardInfo>
                        <label>Usuario: </label>
                        <input 
                            value={user}
                            onChange={handleInputUser}
                            placeholder="Nombre de usuario"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Contraseña: </label>
                        <input 
                            value={password}
                            onChange={handleInpuPassword}
                            placeholder={user? "Nueva contraseña del usuario" : "Contraseña del usuario"}
                            type="password"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Confirmar contraseña: </label>
                        <input 
                            value={confirmPassword}
                            onChange={handleInpuConfirmPassword}
                            placeholder={user ? "Confirmar la nueva contraseña del usuario" : "Confirmar la contraseña del usuario"}
                            type="password"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Linea: </label>
                        <input 
                            value={line}
                            onChange={handleInputLine}
                            placeholder="Linea de producción"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Email: </label>
                        <input 
                            value={email}
                            onChange={handleInputEmail}
                            placeholder="Correo del usuario"
                        />
                    </CardInfo>
                    {/* <CardInfo>
                        <label>Tipo de usuario: </label>
                        <select value={typeUser} onChange={handleSelect}>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </CardInfo> */}
                    <ButtonPrimary width="15vw" height="4vh" onClick={handleBtn}>{userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}</ButtonPrimary>
                    {err && <Text color="red">{message}</Text>}
                </CreateUserForm>
            </ModalContainer>
        </Modal>
    )
}

export default CreateUser