import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

import MainContainer from '../components/common/MainContainer'
import TopBar from '../components/tpm/TopBar'
import Info from '../components/tpm/Info'
import Panel from '../components/tpm/panel/Panel'
import History from '../components/tpm/history/History'
import Modify from '../components/tpm/config/Modify'

import { URL, maxWidth } from '../var'
import { setRootStyle } from '../scripts'

function Tpm(){

    const history = useHistory()

    const [viewType, setViewType] = useState('panel')
    const [line, setLine] = useState('')
    const [user, setUser] = useState('')
    const [state, setState] = useState('rgb(254, 13, 46)')
    const [machineState, setMachineState] = useState('rgb(254, 13, 46)')
    const [machine, setMachine] = useState({})
    const [machines, setMachines] = useState([])
    const [schedule, setSchedule] = useState([])
    const [machinesDay, setMachinesDay] = useState([])
    const [activities, setActivities] = useState([])
    const [history, setHistory] = useState([])
    const [cards, setCards] = useState([])
    const [lineUser, setLineUser] = useState(false)

    const getMachines = async () => {
        const res = await axios({
            url: `${URL}/tpm/modificar/cronograma/get/${line}/`,
            method: 'GET',
        })

        return res.data
    }

    const getActivities = async (machine) => {
        const res = await axios({
            url: `${URL}/tpm/maquina/`,
            method: 'POST',
            data: querystring.stringify({ id: machine.id }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const getMachinesDay = async () => { 
        const res = await axios({
            url: `${URL}/tpm/get/${line}/`,
            method: 'GET'
        })

        return res.data
    }

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        return res.data
    }

    const setCurrentMachineState = (cards) => {
        if(cards.length === 0){ setMachineState('rgb(254, 13, 46)') }
        else{
            let ctrl = true
            for(let i = 0; i < cards.length; i++){
                if(!cards[i].tipo){ ctrl = false }
            }
            if(ctrl){ setMachineState('green') }
            else{ setMachineState('yellow') }
        }
    }

    useEffect(() => {
        if(JSON.stringify(machine) !== '{}' && viewType === 'panel'){
            getActivities(machine).then(({ actividades }) => {
                const activities = JSON.parse(actividades).map(item => { return { ...item.fields, id: item.pk } })
                setActivities(activities)
                setCurrentMachineState(cards.filter(item => item.maquina === machine.id))

            }).catch(e => console.log(e))
        }
    }, [machine])

    const setGeneralState = (cards) => {
        if(cards.length === 0){ setState('red') }
        else{
            let ctrl = true
            for(let i = 0; i < cards.length; i++){
                if(!cards[i].tipo){ ctrl = false }
            }
            if(ctrl){ setState('green') }
            else{ setState('yellow') }
        }
    }

    useEffect(() => {
        setRootStyle(true)
        isLogged().then(({ Logged, linea, Usuario, priv }) => {
            if(!Logged){ window.location.replace('/login') }
            if(priv === "mantenimiento"){ history.goBack() }
            setUser(Usuario)
            if(linea){ setLine(linea) }
            else{ setLineUser(false) }
            
        }).catch(e => console.log(e))

    }, [])

    useEffect(() => {
        if(line !== ''){
            console.log(line)
            getMachines().then(({ maquinas, cronograma, linea, usuario }) =>{
                const machines = JSON.parse(maquinas).map(item => { return { ...item.fields, id: item.pk } })
                const schedule = JSON.parse(cronograma).map(item => item.fields)
                
                setSchedule(schedule)
                setMachines(machines)
                setLine(linea)
                setUser(usuario)
                
                getMachinesDay().then(({ maqdia, tarjetas}) =>{
                    const cards = JSON.parse(tarjetas).map(item => item.fields)
                    const newMachinesDay = JSON.parse(maqdia).map(item => { return { ...item.fields, id: item.pk } }).map(machineSchedule => { 
                        return { ...machines.find(machine => machine.id === machineSchedule.maquina) }
                    })
                    
                    setCards(cards)
                    setGeneralState(cards)
                    setMachinesDay(newMachinesDay)
    
                }).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            })
        }
    }, [line])

    return(
        <MainContainer>
            <TopBar setViewType={setViewType} viewType={viewType} user={user} />
            <Info line={line} user={user} setLine={setLine} lineUser={lineUser} />
            {viewType === 'panel' ? (
                <Panel 
                    machines={machinesDay}
                    setMachine={setMachine}
                    machine={machine}
                    activities={activities}
                    state={state}
                    machineState={machineState}
                    line={line}
                    user={user}
                />
            ):viewType === 'history' ? (
                <History 
                    machines={machines}
                    setMachine={setMachine}
                    machine={machine}
                    history={history}
                    setHistory={setHistory}
                    line={line}
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