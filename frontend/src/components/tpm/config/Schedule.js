import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import AddMachineSchedule from './AddMachineSchedule'

import { Container, Table, PanelTableCell } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

import { days, URL } from '../../../var'

import trash from '../../../assets/img/basura.png'

function Schedule({ machines, schedule }){

    const [modalOpen, setModalOpen] = useState(false)
    const [machinesMonday, setMachinesMonday] = useState([])
    const [machinesTuesday, setMachinesTuesday] = useState([])
    const [machinesWednesday, setMachinesWednesday] = useState([])
    const [machinesThursday, setMachinesThursday] = useState([])
    const [machinesFriday, setMachinesFriday] = useState([])
    const [machinesSaturday, setMachinesSaturday] = useState([])
    const [machinesSunday, setMachinesSunday] = useState([])

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const deleteData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/cronograma/delete/`,
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

    const renderMachines = day => {
        switch(day){
            case 'Lunes': return machinesMonday.map(machine => machine.nombre)
            case 'Martes': return machinesTuesday.map(machine => machine.nombre)
            case 'Miercoles': return machinesWednesday.map(machine => machine.nombre)
            case 'Jueves': return machinesThursday.map(machine => machine.nombre)
            case 'Viernes': return machinesFriday.map(machine => machine.nombre)
            case 'Sabado': return machinesSaturday.map(machine => machine.nombre)
            default: return machinesSunday.map(machine => machine.nombre)
        }
    }

    const getMachines = (day) => {
        switch(day){
            case 'Lunes': return machinesMonday
            case 'Martes': return machinesTuesday
            case 'Miercoles': return machinesWednesday
            case 'Jueves': return machinesThursday
            case 'Viernes': return machinesFriday
            case 'Sabado': return machinesSaturday
            default: return machinesSunday
        }
    }

    const getSetMachines = (day) => {
        switch(day){
            case 'Lunes': return setMachinesMonday
            case 'Martes': return setMachinesTuesday
            case 'Miercoles': return setMachinesWednesday
            case 'Jueves': return setMachinesThursday
            case 'Viernes': return setMachinesFriday
            case 'Sabado': return setMachinesSaturday
            default: return setMachinesSunday
        }
    }

    const addMachine = (day, idx) => {
        const newDayValue = [...getMachines(day)]
        newDayValue.push(machines[idx])
        getSetMachines(day)(newDayValue)
        closeModal()
    }

    const getClassName = (day, idx) => {
        let className = 'border-left'
        switch(day){
            case 'Lunes':
                if(!machinesTuesday[idx]){  className += ' border-right' }
                return className
            case 'Martes': 
                if(!machinesWednesday[idx]){  className += ' border-right' }
                return className
            case 'Miercoles':
                if(!machinesThursday[idx]){  className += ' border-right' }
                return className
            case 'Jueves':
                if(!machinesFriday[idx]){  className += ' border-right' }
                return className
            case 'Viernes': 
                if(!machinesSaturday[idx]){  className += ' border-right' }
                return className
            case 'Sabado': 
                if(!machinesSunday[idx]){  className += ' border-right' }
                return className
            default: 
                className += ' border-right'
                return className
        }
    }

    const getWidth = (day, idx) => {
        switch(day){
            case 'Lunes':
                if(!machinesTuesday[idx]){  return 'calc(100% - 2px)' }
                break;
            case 'Martes': 
                if(!machinesWednesday[idx]){  return 'calc(100% - 2px)' }
                break;
            case 'Miercoles':
                if(!machinesThursday[idx]){  return 'calc(100% - 2px)' }
                break;
            case 'Jueves':
                if(!machinesFriday[idx]){  return 'calc(100% - 2px)' }
                break;
            case 'Viernes': 
                if(!machinesSaturday[idx]){  return 'calc(100% - 2px)' }
                break;
            case 'Sabado': 
                if(!machinesSunday[idx]){  return 'calc(100% - 2px)' }
                break;
            default: 
                return 'calc(100% - 2px)'
        }
        return '100%'
    }

    const deleteMachine = (day, idx) => {
        const newMachinesDay = [...getMachines(day)]
        deleteData({ data: JSON.stringify({maquina: newMachinesDay[idx], dia: getNumberDay(day)}) }).then(() => {
            newMachinesDay.splice(idx, 1)
            getSetMachines(day)(newMachinesDay)
        }).catch(e => console.log(e))
    }

    const getNumberDay = (day) => {
        switch(day){
            case 'Lunes': return 0
            case 'Martes': return 1
            case 'Miercoles': return 2
            case 'Jueves': return 3
            case 'Viernes': return 4
            case 'Sabado': return 5
            default: return 6
        }
    }

    const checkMachineExist = (machine, day) => {
        let machinesDay = [...getMachines(day)]
        if(machinesDay.find(machineSchedule => machineSchedule.id === Number(machine + 1))){
            return false
        }else{ return true }
    }

    useEffect(() => {
        for(let i = 0; i < days.length; i++){
            let newDayValue = [...getMachines(days[i])]
            newDayValue = schedule.filter(machine => machine.dia === i).map(machineSchedule => { 
                return { ...machines.find(machine => machine.id === machineSchedule.maquina) }
            })
            getSetMachines(days[i])(newDayValue)
        }
    }, [schedule])

    return(
        <Container >
            <Table widthColumn="20vw" heightRow='fit-content' width="75vw">
                <div className="table border-none">
                    <div className="table-row border-none flex-start  table-schedule">
                        {days.map(day => ( 
                            <div 
                                key={day} 
                                className={`table-column border-none`}
                            >
                                <PanelTableCell 
                                    width="100%" 
                                    height="5vh"
                                    className={`header border-top border-bottom border-left ${day === 'Domingo' && 'border-right'}`}
                                >
                                    {day}
                                </PanelTableCell>
                                {renderMachines(day).map((machine, idx) => (
                                    <PanelTableCell 
                                        width={getWidth(day, idx)} 
                                        height="5vh"
                                        className={`border-bottom ${getClassName(day, idx)}`}
                                        key={idx}
                                    >
                                        <img src={trash} alt="Icono de un bote de basura" className="img-effect" onClick={() => deleteMachine(day, idx)}/>
                                        <div>
                                            <span>{machine}</span>
                                        </div>
                                    </PanelTableCell>
                                ))}
                            </div>
                        ))} 
                    </div>
                </div>
            </Table>
            <AddMachineSchedule 
                machines={machines}
                closeModal={closeModal}
                modalOpen={modalOpen}
                addMachine={addMachine}
                checkMachineExist={checkMachineExist}
                getNumberDay={getNumberDay}
            />
            <ButtonPrimary width="15vw" height="4vh" onClick={openModal}>Agregar Maquina</ButtonPrimary>
        </Container>
    )
}

export default Schedule