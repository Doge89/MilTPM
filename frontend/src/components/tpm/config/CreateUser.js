import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

import { CreateUserForm, CardInfo  } from '../../../styles/tpm'
import { ButtonPrimary, Text, ModalContainer } from '../../../styles/common'
 
const customStyles = {
    content : {
        top                   : '22.5%',
        left                  : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : '40%',
        height                : '55%' 
    },
    overlay:{
        zIndex                : 2
    }
};

Modal.setAppElement('#root')

function CreateUser({ modalOpen, closeModal, userToEdit }){

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [typeUser, setTypeUser] = useState('admin')
    const [err, setErr] = useState(false)

    const handleInputUser = e => setUser(e.target.value)
    const handleInpuPassword = e => setPassword(e.target.value)
    const handleInpuConfirmPassword = e => setConfirmPassword(e.target.value)
    const handleSelect = e => setTypeUser(e.target.value)

    const handleCloseModal = () => {
        setUser('')
        setPassword('')
        setConfirmPassword('')
        setTypeUser('admin')
        closeModal()
    }

    const checkData = () =>{
        setErr(false)
        if(!user || !password){
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

        }
    }

    useEffect(() => {
        if(userToEdit){
            setUser(userToEdit.user)
            setTypeUser(userToEdit.type)
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
                        <label>Tipo de usuario: </label>
                        <select value={typeUser} onChange={handleSelect}>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </CardInfo>
                    <ButtonPrimary width="10vw" height="4vh" onClick={handleBtn}>Crear Usuario</ButtonPrimary>
                    {err && <Text color="red">{message}</Text>}
                </CreateUserForm>
            </ModalContainer>
        </Modal>
    )
}

export default CreateUser