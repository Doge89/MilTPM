import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataStatus({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const [descripcion, setDescripcion] = useState('')

    const handleInput = e => {
        setDescripcion(e.target.value)
        let newDescripcion = [...context.descripcion]
        newDescripcion[idx] = e.target.value
        context.dispatchDescripcion({ type: 'SET', value: newDescripcion })
    }

    useEffect(() => {
        const valueDescription = info.description?.find(infoDescription => infoDescription.from === Number(info.start.split(':')[0]))
        if(valueDescription){ setDescripcion(valueDescription.value) }
    }, [info])

    return(
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom text-align"
                value={descripcion}
                onChange={handleInput}
                disabled={history}
            />
        </Cell>
    )
}

export default TableDataStatus