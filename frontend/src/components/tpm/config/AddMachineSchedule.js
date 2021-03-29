import React, { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios'

import { CreateUserForm, CardInfo  } from '../../../styles/tpm'
import { ButtonPrimary, ModalContainer } from '../../../styles/common'

import { days, URL } from '../../../var'
 
const customStyles = {
    content : {
        top                   : '22.5%',
        left                  : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : '40%',
        height                : '55%'
    },
    overlay: {
        zIndex: 2
    }
};

Modal.setAppElement('#root')

function AddMachineSchedule({ modalOpen, closeModal, machines, addMachine }){

    const [machine, setMachine] = useState(machines[0])
    const [day, setDay] = useState(days[0])
    
    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/machines`,
            method: 'POST',
            data
        })

        return res.data
    }

    const handleSelectMachine = e => setMachine(e.target.value)
    const handleSelectDay = e => setDay(e.target.value)

    const handleBtn = (e) => {
        e.preventDefault()
        if(machine && day){
            /* postData({ day, machine }).then(() => {
                addMachine(day, machine)
            }).catch(e => console.log(e)) */
            addMachine(day, machine)
        }
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
                        <select value={machine} onChange={handleSelectMachine}>
                            {machines.map((machine, idx) => (
                                <option value={idx} key={idx}>{machine.nombre}</option>
                            ))}
                        </select>
                    </CardInfo>
                    <CardInfo>
                        <label>Día: </label>
                        <select value={day} onChange={handleSelectDay}>
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