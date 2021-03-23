import React, { useState, useContext } from 'react';

import MachineSelector from '../Selector'
import PanelTable from './PanelTable'
import Card from '../Card'

import { Container, SatusContainer, Status } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderTPM' 

function Panel({ setMachine, machines, machine, activities }){

    const context = useContext(appContext)

    const [card, setCard] = useState(false)
    const [cardType, setCardType] = useState(false)
    const [description, setDescription] = useState('')

    const showCard = () => {
        setCard(!card)
        let cardType = true
        let description = ''
        for(let i = 0; i < context.status.length; i++){
            if(!context.status[i].status){
                cardType = false
                description += `${context.status[i].activityName},`
            }
        }
        setDescription(description)
        setCardType(cardType)
    }

    return(
        <Container>
            <MachineSelector 
                setMachine={setMachine}
                machines={machines}
                machineSelected={machine}
                title="Selecciona la Máquina"
            />
            <SatusContainer>
                <div>
                    <span>Estado general: </span>
                    <Status />
                </div>
                <div>
                    <span>{machine.nombre}</span>
                </div>
            </SatusContainer>
            <PanelTable 
                machine={machine}
                activities={activities}
                card={card}
            />
            <ButtonPrimary width="20vw" height="4vh" onClick={showCard}>Validar información</ButtonPrimary>
            {card && (
                <Card 
                    info={{
                        tipo: cardType,
                        maquina: machine.nombre,
                        usuario: 'admin',
                        area: 'Ensamble',
                        localizacion: 'linea 4',
                        descripcion: description.split(',').map(item => (
                            <>
                                {item}
                                <br/>
                            </>
                        ))
                    }}
                />
            )}
        </Container>
    )
}

export default Panel;