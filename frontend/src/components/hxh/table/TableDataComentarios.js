import React, { useState, useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataComentarios({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const [comentario, setComentario] = useState('')

    const handleInput = e => {
        setComentario(e.target.value)
        let newComentario = [...context.comentario]
        newComentario[idx] = e.target.value
        context.dispatchComentario({ type: 'SET', value: newComentario })
    }

    useEffect(() => {
        const valueComments = info.comments?.find(infoComments => infoComments.from === Number(info.start.split(':')[0]))
        if(valueComments){ setComentario(valueComments.value) }
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
                value={comentario}
                onChange={handleInput}
                disabled={history}
            />
        </Cell>
    )
}

export default TableDataComentarios