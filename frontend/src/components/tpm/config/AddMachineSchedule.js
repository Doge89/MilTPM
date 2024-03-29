import React, { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import { CreateUserForm, CardInfo  } from '../../../styles/tpm'
import { ButtonPrimary, ModalContainer } from '../../../styles/common'

import { days, URL, maxWidth } from '../../../var'
 
const customStyles = {
    content : {
        top                   : '22.5%',
        left                  : window.innerWidth <= maxWidth ? '10%' : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : window.innerWidth <= maxWidth ? '70%' : '40%',
        height                : '55%'
    },
    overlay: {
        zIndex: 2
    }
};

Modal.setAppElement('#root')

function AddMachineSchedule({ modalOpen, closeModal, machines, addMachine, checkMachineExist, getNumberDay }){

    const [machine, setMachine] = useState('0')
    const [day, setDay] = useState(days[0])
    
    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/cronograma/get/`,
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

    const handleSelectMachine = e => setMachine(e.target.value)
    const handleSelectDay = e => setDay(e.target.value)

    const handleBtn = (e) => {
        e.preventDefault()
        if(machine && day && checkMachineExist(machine, day)){
            postData({ data:  JSON.stringify({ dia: getNumberDay(day), maquina: Number(machine) + 1 }) }).then(() => {
                addMachine(day, machine)
                
            }).catch(e => console.log(e))
        }
        window.location.reload()
    }

    return(
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={{...customStyles, zIndex: 2}}
        >
            <ModalContainer>
                <CreateUserForm>
                    <h1>Agregar Máquina</h1>
                    <CardInfo>
                        <label>Máquina: </label>
                        <select value={machine} onChange={handleSelectMachine} className="select-schedule">
                            {machines.map((machine, idx) => (
                                <option value={idx} key={idx}>{machine.nombre}</option>
                            ))}
                        </select>
                    </CardInfo>
                    <CardInfo>
                        <label>Día: </label>
                        <select value={day} onChange={handleSelectDay} className="select-schedule">
                            {days.map(day => (
                                <option value={day} key={day}>{day}</option>
                            ))}
                        </select>
                    </CardInfo>
                    <ButtonPrimary width="10vw" height="4vh" onClick={handleBtn}>Agregar Máquina</ButtonPrimary>
                </CreateUserForm>
            </ModalContainer>
        </Modal>
    )
}

export default AddMachineSchedule