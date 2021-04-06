import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'

import MachineSelector from '../Selector'
import TableHistory from './HistoryTable'
import HistorySearch from './HistorySearch'
import Card from '../Card'

import { Container } from '../../../styles/tpm'

import { URL } from '../../../var'
import { getDate } from '../../../scripts'

function History({ machines, setMachine, machine, history, setHistory, line }){

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

    useEffect(() => {
        if(JSON.stringify(machine !== "{}")){
            console.log('a')
            getHistory().then(({ hist, Usuario }) => {
                const history = JSON.parse(hist).map(item => { return { ...item.fields, id: item.pk, fecha: getDate(item.fields.fecha), usuario: Usuario, maquina: machine.nombre } })
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
            <HistorySearch 
                setHistory={setHistory}
                machines={machines}
            />
            <TableHistory 
                history={history}
                showCard={showCard} 
            />
            {card && (
                <Card info={cardInfo} history edit line={line}/>
            )}
        </Container>
    )
}

export default History