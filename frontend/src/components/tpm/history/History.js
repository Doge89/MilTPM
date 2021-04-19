import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

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
            data: querystring.stringify({ data: JSON.stringify({ maquina: machine.nombre, linea: line })}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const notFound = () => {
        setCard(false)
        setHistory([])
    }

    const showCard = (idx) => {
        setCard(true)
        setCardInfo(history[idx])
    }

    const updateHistory = info => {
        let newHistory = [...history]
        const idx = newHistory.findIndex(item => item.id === info.id)
        newHistory.splice(idx ,1 ,info)
        setHistory(newHistory)
    }

    const closeCard = () => setCard(false)

    useEffect(() => {
        if(card){ document.getElementById('card').scrollIntoView({ behavior: 'smooth' }) }
    }, [card])

    useEffect(() => {
        if(JSON.stringify(machine) !== "{}" && line !== ''){
            getHistory().then(({ hist, users }) => {
                
                const history = JSON.parse(hist).map((item, idx) => { return { ...item.fields, id: item.pk, usuario: users[idx], fecha: getDate(item.fields.fecha), maquina: machine.nombre } })
                setHistory(history)
            }).catch(e => console.log(e))
        }
    }, [machine, line])

    return(
        <Container>
            <HistorySearch 
                setHistory={setHistory}
                machines={machines}
                notFound={notFound}
                line={line}
            />
            <MachineSelector 
                setMachine={setMachine}
                machines={machines}
                machineSelected={machine}
                title="Selecciona la Máquina"
            />
            {history.length !== 0 && (
                <TableHistory 
                    history={history}
                    showCard={showCard} 
                />
            )}
            {card && (
                <Card 
                    info={{...cardInfo, localizacion: line, descripcion: cardInfo.descripcion.split(',').map((item, idx) => (
                        <React.Fragment key={idx}>
                            {item}
                            <br/>
                        </React.Fragment>
                    ))}} 
                    history 
                    edit 
                    line={line}
                    updateHistory={updateHistory}
                    closeCard={closeCard}
                />
            )}
        </Container>
    )
}

export default History