import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'
import { Text } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

import { twoDigits } from '../../../scripts'
import { maxWidth, URL } from '../../../var'


function TableDataProduction({ getWidthCell, idx, history, deadTimes, userType }){

    const context = useContext(appContext)
    
    // const [timeoutHxh, setTimeoutHxh] = useState('00:00:00')
    const [diferencia, setDiferencia] = useState('')
    const [color, setColor] = useState('')
    const [inputcolor, setInputColor] = useState('')
    const [respInputColor, setRespInputColor] = useState('')

    const handleInputActual = e => {
        console.info("Handle Input")
        let newActual = [...context.actual]
        newActual[idx] = Math.floor(e.target.value)
        context.dispatchActual({ type: 'SET', value: newActual })
    }

    const handleInputDifference = e => {
        setDiferencia(e.target.value)
        let newDiferencia = [...context.diferencia]
        newDiferencia[idx] = e.target.value
        context.dispatchDiferencia({ type: 'SET', value: newDiferencia })
        
    }

    const getCurrentActual = () => {
        let total = 0
        for(let i = 0; i < idx + 1; i++){
            total += Number(context.actual[i])
        }
        return isNaN(total) ? '' : total
    }

    const setDifference = dif => {
        setDiferencia(dif.toString())
        let newDiferencia = [...context.diferencia]
        if(newDiferencia.length !== 0){
            newDiferencia[idx] = dif.toString()
            context.dispatchDiferencia({ type: 'SET', value: newDiferencia })
            if(dif < 0){
                console.log(dif)
                setColor('rgb(255, 13, 47)')
                setInputColor('rgb(255, 49 ,76)')
                setRespInputColor("rgb(255, 13, 47)")
            }else{
                setColor('green')
                setRespInputColor("green")
            }
            
        }
        
    }

    // const setTimeoutValue = dif => {
    //     let newTimeout = [...context.timeout]
    //     if(dif < 0){
    //         const timeout = (Math.abs(dif) * 60 * 60 ) / Number(context.plan[idx])
    //         const timeoutValue = `${twoDigits(Math.floor(timeout / 3600) % 60)}:${twoDigits(Math.floor(timeout / 60) % 60)}:${twoDigits(parseInt(timeout%60))}`
    //         setTimeoutHxh(deadTimes[idx])
    //         newTimeout[idx] = deadTimes[idx]
    //     }else{ 
    //         setTimeoutHxh('00:00:00') 
    //         newTimeout[idx] = '00:00:00'
    //     }
    //     context.dispatchTimeout({ type: 'SET', value: deadTimes })
    // } 

    useEffect(() => {
        const dif = Number(context.actual[idx]) - Number(context.plan[idx])
        if(!isNaN(dif)){
            setDifference(dif)
        }
    }, [context.plan[idx], context.actual[idx]])


    return(
        <>
        <div className="table-title-data">
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Actual
            </Text>
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Diferencia
            </Text>
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Tiempo Muerto
            </Text>
        </div>
        <div className="table-data-container">
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
                backgroundColor="white"
            >
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    onChange={handleInputActual}
                    value={context.actual[idx] || ''}
                    type="number"
                    disabled={history}
                    inputPadding="0"
                />
                <p className="slash">/</p>
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    disabled
                    value={getCurrentActual()}
                    className="second-input"
                />
            </Cell>
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
                backgroundColor={color}
                //style={{backgroundColor: color}}
            > 
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    value={diferencia}
                    onChange={handleInputDifference}
                    type="number"
                    disabled={history}
                    backgroundColor={inputcolor}
                    inputColorResp={window.innerWidth < maxWidth ? respInputColor : "white"}
                />
            </Cell>
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
                backgroundColor="white"
            >
                <Input 
                    width="90%"
                    woLabel
                    inputClassName="border-bottom text-align"                  
                    disabled
                    value={deadTimes[idx]}
                />
            </Cell>
        </div>
        
        </>
    )
}

export default React.memo(TableDataProduction)