import React, { useContext } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataComentarios({ getWidthCell, idx, history }){
    
    const context = useContext(appContext)

    const handleInput = e => {
        let newComentario = [...context.comentario]
        newComentario[idx] = e.target.value
        context.dispatchComentario({ type: 'SET', value: newComentario })
    }

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
                value={context.comentario[idx] || ''}
                onChange={handleInput}
                disabled={history}
            />
        </Cell>
    )
}

export default TableDataComentarios