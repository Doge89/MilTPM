import React, { useContext } from 'react'

import RadioButtons from '../../common/RadioButton'
import Input from '../../common/Input'

import { Container, Text } from '../../../styles/common'
import { SelectContainer } from '../../../styles/mp'

import { appContext } from '../../../reducers/ProviderMP'

import { twoDigits } from '../../../scripts'

const date = `${twoDigits(new Date().getDate())}/${twoDigits(new Date().getMonth() +1)}/${new Date().getFullYear()}`

function TableHeader({ history }){

    const context = useContext(appContext) 

    const handleSelect = e => context.dispatchTurno({ type: 'SET', value: e.target.value })

    const handleButtonMotores = () => {
        if(!history){ context.dispatchType({ type: 'SET', value: 'motores' }) }
    }
    const handleButtonEmpaques = () => {
        if(!history){ context.dispatchType({ type: 'SET', value: 'empaques' }) }
    }
    const handleButtonEnsambles = () => {
        if(!history){ context.dispatchType({ type: 'SET', value: 'ensambles' }) }
    }
    const handleButtonSwitch = () => {
        if(!history){ context.dispatchType({ type: 'SET', value: 'switch' }) }
    }

    const handleInputLine = e => context.dispatchLine({ type: 'SET', value: e.target.value })
    const handleInputTechnicianChief = e => context.dispatchTechnicianChief({ type: 'SET', value: e.target.value })
    const handleInputSuperMTTO = e => context.dispatchSuperMTTO({ type: 'SET', value: e.target.value })
    const handleInputSuperPRDN = e => context.dispatchSuperPRDN({ type: 'SET', value: e.target.value })

    return(
        <div className="table-header">
            <div className="column">
                <Container
                    alignItems="center"
                    margin="0 0 1vh 0"
                >
                    <RadioButtons 
                        color="white"
                        label="Motores"
                        checked={context.type === 'motores'}
                        setChecked={handleButtonMotores}
                        width="10vw"
                    />
                    <RadioButtons 
                        color="white"
                        label="Empaques"
                        checked={context.type === 'empaques'}
                        setChecked={handleButtonEmpaques}
                    />
                </Container>
                <Container
                    alignItems="center"
                >
                    <RadioButtons 
                        color="white"
                        label="Ensambles"
                        checked={context.type === 'ensambles'}
                        setChecked={handleButtonEnsambles}
                        width="10vw"
                    />
                    <RadioButtons 
                        color="white"
                        label="Switch"
                        checked={context.type === 'switch'}
                        setChecked={handleButtonSwitch}
                    />
                </Container>
            </div>
            <div className="column">
                <Container
                    alignItems="center"
                    margin="0 0 1vh 0"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Input 
                        value={context.line}
                        onChange={handleInputLine}
                        label="Línea"
                        labelColor="white"
                    />
                    <Text color="white">Fecha: {date}</Text>
                </Container>
                <Container
                    alignItems="center"
                    width="50vw"
                    margin="0 0 1vh 0"
                >
                    <SelectContainer>
                        <label>Turno:</label>
                        <select onChange={handleSelect} value={context.turno} disabled={history}> 
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </SelectContainer>
                    <Input 
                        value={context.technicianChief}
                        onChange={handleInputTechnicianChief}
                        label="Técnico encargado de la línea"
                        labelColor="white"
                        labelMargin="0 0 0 2vw"
                        labelWidth="28vw"
                        disabled={history}
                    />
                </Container>
                <Container
                    alignItems="center"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Input 
                        value={context.superMTTO}
                        onChange={handleInputSuperMTTO}
                        label="Super MTTO"
                        labelColor="white"
                        labelWidth="10vw"
                        disabled={history}
                    />
                    <Input 
                        value={context.superPRDN}
                        onChange={handleInputSuperPRDN}
                        label="Super PRDN"
                        labelColor="white"
                        labelMargin="0 0 0 2vw"
                        labelWidth="10vw"
                        disabled={history}
                    />
                </Container>
            </div>
        </div>
    )
}

export default TableHeader