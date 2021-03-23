import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataContramedida({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const [contramedida, setContramedida] = useState('')

    const handleInput = e => {
        setContramedida(e.target.value)
        let newContramedida = [...context.contramedida]
        newContramedida[idx] = e.target.value
        context.dispatchComentario({ type: 'SET', value: newContramedida })
    }

    useEffect(() => {
        const valueContramedida = info.contramedida?.find(infoContramedida => infoContramedida.from === Number(info.start.split(':')[0]))
        if(valueContramedida){ setContramedida(valueContramedida.value) }
    }, [info])

    return(
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom"
                textarea
                value={contramedida}
                onChange={handleInput}
                disabled={history}
            />
        </Cell>
    )
}

export default TableDataContramedida