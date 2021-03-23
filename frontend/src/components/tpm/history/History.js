import React, { useState } from 'react'

import MachineSelector from '../Selector'
import TableHistory from './HistoryTable'
import HistorySearch from './HistorySearch'
import Card from '../Card'

import { Container } from '../../../styles/tpm'

function History({ machines, setMachine, machine, history }){

    const [cardInfo, setCardInfo] = useState({})
    const [card, setCard] = useState(false)

    const showCard = (idx) => {
        setCard(true)
        setCardInfo(history[idx])
    }

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