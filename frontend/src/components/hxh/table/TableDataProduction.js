import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

import { twoDigits } from '../../../scripts'

function TableDataProduction({ getWidthCell, idx, history }){

    const context = useContext(appContext)
    
    const [timeoutHxh, setTimeoutHxh] = useState('00:00:00')
    const [diferencia, setDiferencia] = useState('')

    const handleInputActual = e => {
        let newActual = [...context.actual]
        newActual[idx] = e.target.value
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
        }
        
    }

    const setTimeoutValue = dif => {
        let newTimeout = [...context.timeout]
        if(dif < 0){
            const timeout = (Math.abs(dif) * 60 * 60 ) / Number(context.plan[idx])
            const timeoutValue = `${twoDigits(Math.floor(timeout / 3600) % 60)}:${twoDigits(Math.floor(timeout / 60) % 60)}:${twoDigits(parseInt(timeout%60))}`
            setTimeoutHxh(timeoutValue)
            newTimeout[idx] = timeoutValue
        }else{ 
            setTimeoutHxh('00:00:00') 
            newTimeout[idx] = '00:00:00'
        }
        context.dispatchTimeout({ type: 'SET', value: newTimeout })
    } 

    useEffect(() => {
        const dif = Number(context.actual[idx]) - Number(context.plan[idx])
        if(!isNaN(dif)){
            setDifference(dif)
            setTimeoutValue(dif)
        }
    }, [context.plan[idx], context.actual[idx]])

    return(
        <>
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom text-align"
                onChange={handleInputActual}
                value={context.actual[idx] || ''}
                type="number"
                disabled={history}
            />
            <p>/</p>
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom text-align"
                disabled
                value={getCurrentActual()}
            />
        </Cell>
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom text-align"
                value={diferencia}
                onChange={handleInputDifference}
                type="number"
                disabled={history}
            />
        </Cell>
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="90%"
                woLabel
                inputClassName="border-bottom text-align"
                textarea
                disabled
                value={timeoutHxh}
            />
        </Cell>
        </>
    )
}

export default React.memo(TableDataProduction)