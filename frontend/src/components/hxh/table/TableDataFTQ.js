import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDateFTQ({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const [codigo, setCodigo] = useState('')
    const [cantidad, setCantidad] = useState('')

    const handleInputCondigo = e => {
        setCodigo(e.target.value)
        let newCodigo = [...context.codigo]
        newCodigo[idx] = e.target.value
        context.dispatchCodigo({ type: 'SET', value: newCodigo })
    }

    const handleInputCantidad = e => {
        setCantidad(e.target.value)
        let newCantidad = [...context.cantidad]
        newCantidad[idx] = e.target.value
        context.dispatchCantidad({ type: 'SET', value: newCantidad })
    }

    useEffect(() => {
        const valueCode = info.code?.find(infoCode => infoCode.from === Number(info.start.split(':')[0]))
        const valueQuantity = info.quantity?.find(infoQuantity => infoQuantity.from === Number(info.start.split(':')[0]))
        if(valueCode){ setCodigo(valueCode.value) }
        if(valueQuantity){ setCantidad(valueQuantity.value) }
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
                value={codigo}
                onChange={handleInputCondigo}
                disabled={history}
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
                value={cantidad}
                onChange={handleInputCantidad}
                disabled={history}
            />
        </Cell>
        </>
    )
}

export default TableDateFTQ