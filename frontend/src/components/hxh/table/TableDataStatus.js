import React, { useContext } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'
import { Text } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataStatus({ getWidthCell, idx, history }){

    const context = useContext(appContext)

    const handleInput = e => {
        let newDescripcion = [...context.descripcion]
        newDescripcion[idx] = e.target.value
        context.dispatchDescripcion({ type: 'SET', value: newDescripcion })
    }

    return(
        <>
        <div className="table-title-data">
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Descripción defecto
            </Text>
        </div>
        <div className="table-data-container">
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
            >
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    value={context.descripcion[idx] || ''}
                    onChange={handleInput}
                    disabled={history}
                />
            </Cell>
        </div>
        </>
    )
}

export default TableDataStatus