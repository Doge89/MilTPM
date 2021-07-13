import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

import { ModalContainer, ButtonPrimary, Text } from '../../../styles/common'
import { CardInfo, CreateUserForm } from '../../../styles/tpm'

import { URL } from '../../../var'

import { maxWidth } from '../../../var'

const customStyles = {

    content: {
        top: window.innerWidth <= maxWidth ? "5%" : "15%",
        left: window.innerWidth <= maxWidth ? "10%" : "30%",
        bottom: "auto",
        right: "auto", 
        width: window.innerWidth <= maxWidth ? "85%" : "40%",
        height: window.innerWidth <= maxWidth ? "60%" : "45%",
    },
    overlay: {
        zIndex: 2
    }
}

Modal.setAppElement('#root')

function LineEdit({ isOpen, closeModal, lineToEdit }) {
    
    const [newWorkers, setNewWorkers] = useState(0)
    const [userLine, setUserLine] = useState('')
    const [line, setLine] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [error, setError] = useState(false)

    const fetchLine = async () => {
        const response = await axios({
            url: `${URL}/tpm/get/line/${lineToEdit}/`,
            method: "GET",
            
        })

        return response.data
    }

    const changeWorkers = async (data) => {
        const response = await axios({
            url: `${URL}/tpm/change/workers/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true
        })
        return response.data
    }

    const handleWorkersChange = (e) =>{
        setError(false)
        if(Number(e.target.value) || e.target.value === ""){
            return setNewWorkers(Math.floor(e.target.value))
        }
        setError(true)
        setErrMessage("Solo puede ingresar números")
    }

    const handleClose = () => {
        setLine('')
        setUserLine('')
        setNewWorkers(0)
        closeModal()
    }

    const prepareData = (e) => {
        e.preventDefault()
        if(Number(newWorkers) && newWorkers >= 0){
            changeWorkers({data: JSON.stringify({newWorkers, lineToEdit})})
            .then((data) => {
                handleClose()
                window.location.reload()
            }).catch((e) => {
                console.error(e)
            })
        }else{
            setError(true)
            setErrMessage("Esa cantidad no es valida")
        }
    }

    useEffect(() => {
        console.log(lineToEdit)
        if(lineToEdit !== undefined && lineToEdit !== null && lineToEdit !== "") {
            fetchLine().then((data) => {
                if(data && data !== undefined){
                    console.log(data)
                    setNewWorkers(data.Personal)
                    setUserLine(data.username)
                    setLine(data.Linea)
                }
                
            }).catch(error => console.error(error))
        }
    }, [lineToEdit])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customStyles}
        >
            <ModalContainer>
                <CreateUserForm>
                    <h1>Editar Información de la Linea</h1>
                    <CardInfo>
                        <label>Usuario: </label>
                        <input 
                            disabled={true}
                            value={userLine}
                            placeholder="Nombre de usuario"
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Linea: </label>
                        <input 
                            value={line}
                            placeholder="Linea de producción"
                            disabled={true}
                        />
                    </CardInfo>
                    <CardInfo>
                        <label>Personal: </label>
                        <input 
                            value={newWorkers}
                            onChange={handleWorkersChange}
                            placeholder="No. De Trabajadore"
                        />
                    </CardInfo>
                    <ButtonPrimary width="15vw" height="4vh" onClick={prepareData}>Modificar Linea</ButtonPrimary>
                    {error && <Text color="red" id="message-err">{errMessage}</Text>}
                </CreateUserForm>
            </ModalContainer>
        </Modal>
    )

}

export default LineEdit