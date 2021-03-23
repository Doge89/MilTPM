import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

import { twoDigits } from '../../../scripts'

function TableDataProduction({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const [actual, setActual] = useState('0')
    const [diferencia, setDiferencia] = useState('0')
    const [timeoutHxh, setTimeoutHxh] = useState('00:00:00')

    const handleInputActual = e => {
        setActual(e.target.value)
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
        let newDiferencia = [...context.diferencia]
        newDiferencia[idx] = dif.toString()
        context.dispatchDiferencia({ type: 'SET', value: newDiferencia })
        setDiferencia(dif.toString())
    }

    const setTimeoutValue = dif => {
        if(dif < 0){
            const timeout = (Math.abs(dif) * 60 * 60 ) / Number(context.plan[idx])
            setTimeoutHxh(`${twoDigits(Math.floor(timeout / 3600) % 60)}:${twoDigits(Math.floor(timeout / 60) % 60)}:${twoDigits(timeout%60)}`)
        }
    }

    useEffect(() => {
        const dif = Number(context.actual[idx]) - Number(context.plan[idx])
        if(!isNaN(dif)){
            setDifference(dif)
            setTimeoutValue(dif)
        }
    }, [context.plan[idx], context.actual[idx]])

    useEffect(() => {
        const valueActual = info.actual?.find(infoActual => infoActual.from === Number(info.start.split(':')[0]))
        const valueDifference = info.difference?.find(infoDifference => infoDifference.from === Number(info.start.split(':')[0]))
        const valueTimeout = info.timeout?.find(infoTimeout => infoTimeout.from === Number(info.start.split(':')[0]))
        if(valueActual){ setActual(valueActual.value) }
        if(valueDifference){ setDiferencia(valueDifference.value) }
        if(valueTimeout){ setTimeoutHxh(valueTimeout.value) }
    }, [info])

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
                value={actual}
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