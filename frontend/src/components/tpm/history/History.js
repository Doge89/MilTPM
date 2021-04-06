import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import MachineSelector from '../Selector'
import TableHistory from './HistoryTable'
import HistorySearch from './HistorySearch'
import Card from '../Card'

import { Container } from '../../../styles/tpm'

import { URL } from '../../../var'
import { twoDigits } from '../../../scripts'

function History({ machines, setMachine, machine, history, setHistory }){

    const [cardInfo, setCardInfo] = useState({})
    const [card, setCard] = useState(false)

    const getHistory = async () => {
        const res = await axios({
            url : `${URL}/tpm/historial/`,
            method: 'POST',
            data: querystring.stringify({ maquina: machine.nombre })
        })

        return res.data
    }

    const showCard = (idx) => {
        setCard(true)
        setCardInfo(history[idx])
    }

    const getDate = (date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${twoDigits(newDate.getHours())}:${twoDigits(newDate.getMinutes())}`
    }

    useEffect(() => {
        if(JSON.stringify(machine !== "{}")){
            console.log('a')
            getHistory().then(({ hist, usuario }) => {
                console.log(usuario)
                const history = JSON.parse(hist).map(item => { return { ...item.fields, id: item.pk, fecha: getDate(item.fields.fecha), usuario } })
                setHistory(history)
            }).catch(e => console.log(e))
        }
    }, [machine])

    return(
        <Container>
            <MachineSelector 
                setMachine={setMachine}
                machines={machines}
                machineSelected={machine}
                title="Selecciona la Máquina"
            />
            <HistorySearch />
            <TableHistory 
                history={history}
                showCard={showCard} 
            />
            {card && (
                <Card info={cardInfo} history edit/>
            )}
        </Container>
    )
}

export default History