import React, { useState, useContext } from 'react';
import axios from 'axios'
import querystring from 'querystring'

import MachineSelector from '../Selector'
import PanelTable from './PanelTable'
import Card from '../Card'

import { Container, SatusContainer, Status } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderTPM' 

import { URL } from '../../../var'

function Panel({ setMachine, machines, machine, activities, state, machineState }){

    const context = useContext(appContext)

    const [card, setCard] = useState(false)
    const [cardType, setCardType] = useState(false)
    const [description, setDescription] = useState('')

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/post/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const getDescription = () => {
        let description = ''
        let cardType = true
        for(let i = 0; i < context.status.length; i++){
            if(!context.status[i].status){
                cardType = false
                description += `${context.status[i].activityName},`
            }
        }
        return { description, cardType }
    }

    const postInfo = () => {
        const {description, cardType} = getDescription()
        postData({ data: JSON.stringify({ descripcion: description, categoria: machine.nombre, tipo: cardType ? 1 : 0 }) }).then((data) => {
            showCard(description, cardType)
        }).catch(e => {
            console.log(e)
        })
    }

    const showCard = (description, cardType) => {
        setCard(!card)
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
            {JSON.stringify(machine) !== "{}" && (
                <>
                <SatusContainer>
                    <div>
                        <span>Estado general: </span>
                        <Status color={state}/>
                    </div>
                    <div>
                        <span>{machine.nombre}</span>
                        <Status color={machineState}/>
                    </div>
                </SatusContainer>
                <PanelTable 
                    machine={machine}
                    activities={activities}
                    card={card}
                />
                <ButtonPrimary width="20vw" height="4vh" onClick={postInfo}>Validar información</ButtonPrimary>
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
                </>
            )}
            
        </Container>
    )
}

export default Panel;