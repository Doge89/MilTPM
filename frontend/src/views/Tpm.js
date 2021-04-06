import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import MainContainer from '../components/common/MainContainer'
import TopBar from '../components/tpm/TopBar'
import Info from '../components/tpm/Info'
import Panel from '../components/tpm/panel/Panel'
import History from '../components/tpm/history/History'
import Modify from '../components/tpm/config/Modify'

import { URL } from '../var'

function Tpm(){

    const [viewType, setViewType] = useState('panel')
    const [machine, setMachine] = useState({})
    
    const [machines, setMachines] = useState([])
    const [schedule, setSchedule] = useState([])
    const [machinesDay, setMachinesDay] = useState([])
    const [activities, setActivities] = useState([])
    const [history, setHistory] = useState([{ id: 1, fecha: '16-03-2021 16:21:00', tipo: false, maquina: 'runnibg_booth', usuario: 'admin', 
                                        area: 'ensamblado', localizacion: 'Linea 4', descripcion: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                        propuesta: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                        implementada: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }])

    const getMachines = async () => {
        const res = await axios({
            url: `${URL}/tpm/modificar/cronograma/get/`,
            method: 'GET'
        })

        return res.data
    }

    const getActivities = async (machine) => {
        const res = await axios({
            url: `${URL}/tpm/modificar/cronograma/get/`,
            method: 'POST',
            data: querystring({ id: machine.id })
        })

        return res.data
    }

    const getMachinesDay = async () => { 
        const res = await axios({
            url: `${URL}/tpm/get/`,
            method: 'GET'
        })

        return res.data
    }

    useEffect(() => {
        if(JSON.stringify(machine) !== '{}'){
            getActivities().then(({ actividades }) => {
                console.log(actividades)
                const activities = JSON.parse(actividades).map(item => { return { ...item.fields, id: item.pk } })
                setActivities(activities)
            }).catch(e => console.log(e))
        }
    }, [machine])

    useEffect(() => {
        document.getElementById('root').style.overflowY = 'auto'

        getMachines().then(({ maquinas, cronograma }) =>{
            const machines = JSON.parse(maquinas).map(item => { return { ...item.fields, id: item.pk } })
            const schedule = JSON.parse(cronograma).map(item => item.fields)
            setSchedule(schedule)
            setMachines(machines)

            getMachinesDay().then(({ maqdia}) =>{

                const newMachinesDay = JSON.parse(maqdia).map(item => { return { ...item.fields, id: item.pk } }).map(machineSchedule => { 
                    return { ...machines.find(machine => machine.id === machineSchedule.maquina) }
                })
                setMachinesDay(newMachinesDay)

            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
       
    }, [])

    return(
        <MainContainer>
            <TopBar setViewType={setViewType} viewType={viewType}/>
            <Info />
            {viewType === 'panel' ? (
                <Panel 
                    machines={machinesDay}
                    setMachine={setMachine}
                    machine={machine}
                    activities={activities}
                />
            ):viewType === 'history' ? (
                <History 
                    machines={machines}
                    setMachine={setMachine}
                    machine={machine}
                    history={history}
                />
            ):(
                <Modify 
                    machines={machines}
                    schedule={schedule}
                />
            )}
        </MainContainer>
    )
}

export default Tpm