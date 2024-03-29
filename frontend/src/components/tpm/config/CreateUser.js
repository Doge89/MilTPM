import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import { CreateUserForm, CardInfo  } from '../../../styles/tpm'
import { ButtonPrimary, Text, ModalContainer } from '../../../styles/common'

import { URL, maxWidth } from '../../../var'
 
const customStyles = {
    content : {
        top                   :  window.innerWidth <= maxWidth ? '5%' : '15%',
        left                  :  window.innerWidth <= maxWidth ? '10%' : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 :  window.innerWidth <= maxWidth ? '70%' : '40%',
        height                :  window.innerWidth <= maxWidth ? '85%' : '70%' 
    },
    overlay:{
        zIndex                : 2
    }
};

Modal.setAppElement('#root')

function CreateUser({ modalOpen, closeModal, userToEdit, addUser, updateUser }){

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [line, setLine] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [clave, setClave] = useState('')
    const [typeUser, setTypeUser] = useState('admin')
    const [err, setErr] = useState(false)

    const handleInputUser = e => setUser(e.target.value)
    const handleInpuPassword = e => setPassword(e.target.value)
    const handleInputLine = e => setLine(e.target.value)
    const handleInputEmail = e => setEmail(e.target.value)
    const handleInputClave = e => setClave(e.target.value)
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
            data: querystring.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const updateData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/usuarios/modify/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const checkData = () =>{
        setErr(false)
        if(!user || (JSON.stringify(userToEdit) === "{}" && !password) || (!line && typeUser === "production") || !email){
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
                updateData({data: JSON.stringify({ user, password, tipoUsuario: typeUser, linea: line, email, id })})
                .then(() => {
                    updateUser({...userToEdit, username: user, linea: line, email})
                    closeModal()
                }).catch(e => console.log(e))
            }else{
                postData({data: JSON.stringify({ user, password, tipoUsuario: typeUser, linea: line, email, clave })})
                .then(({ usuario, Error }) => {
                    if(Error){
                        setErr(true)
                        return setMessage(Error)
                    }
                    addUser({ id: usuario.id, email: usuario.email, linea: usuario.linea, username: usuario.username, clave })
                    closeModal()    
                }).catch(e => {
                    console.log(e.response?.message)
                    setErr(true)
                    setMessage('No se ha podido crear el usuario debido a un error en el servidor.')
                })
            }
        }
    }

    useEffect(() => {
        if(userToEdit){
            setUser(userToEdit.username)
            setTypeUser(userToEdit.type)
            setEmail(userToEdit.email)
            setLine(userToEdit.linea)
            setId(userToEdit.id)
            setClave(userToEdit.clave)
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
                    <h1>{!userToEdit ? 'Crear Usuario' : 'Actualizar Usuario'}</h1>
                    <CardInfo>
                        <label>Usuario: </label>
                        <input 
                            value={user}
                            onChange={handleInputUser}
                            placeholder="Nombre de usuario"
                        />
                    </CardInfo>
                    <CardInfo className="margin-none">
                        <label>Contraseña: </label>
                        <input 
                            value={password}
                            onChange={handleInpuPassword}
                            placeholder={userToEdit? "Nueva contraseña del usuario" : "Contraseña del usuario"}
                            type="password"
                        />
                    </CardInfo>
                    {userToEdit && <span>*Opcional.</span>}
                    <CardInfo className="margin-none"> 
                        <label>Confirmar contraseña: </label>
                        <input 
                            value={confirmPassword}
                            onChange={handleInpuConfirmPassword}
                            placeholder={userToEdit ? "Confirmar la nueva contraseña del usuario" : "Confirmar la contraseña del usuario"}
                            type="password"
                        />
                    </CardInfo>
                    {userToEdit && <span>*Opcional.</span>}
                    {typeUser === "production" && (
                        <CardInfo>
                            <label>Linea: </label>
                            <input 
                                value={line}
                                onChange={handleInputLine}
                                placeholder="Linea de producción"
                            />
                        </CardInfo>
                    )}
                    {typeUser === "production" && (
                        <CardInfo>
                            <label>Clave: </label>
                            <input 
                                value={clave}
                                onChange={handleInputClave}
                                placeholder="Clave de usuario"
                            />
                        </CardInfo>
                    )}
                    <CardInfo>
                        <label>Email: </label>
                        <input 
                            value={email}
                            onChange={handleInputEmail}
                            placeholder="Correo del usuario"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Tipo de usuario: </label>
                        <select value={typeUser} onChange={handleSelect}>
                            <option value="admin">Administrador</option>
                            <option value="production">Producción</option>
                            <option value="mantenimiento">Mantenimiento</option>
                        </select>
                    </CardInfo>
                    <ButtonPrimary width="15vw" height="4vh" onClick={handleBtn}>{userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}</ButtonPrimary>
                    {err && <Text color="red" id="message-err">{message}</Text>}
                </CreateUserForm>
            </ModalContainer>
        </Modal>
    )
}

export default CreateUser