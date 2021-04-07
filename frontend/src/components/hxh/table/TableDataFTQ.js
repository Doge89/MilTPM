import React, { useContext } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'
import { Text } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDateFTQ({ getWidthCell, idx, history, info }){

    const context = useContext(appContext)

    const handleInputCondigo = e => {
        let newCodigo = [...context.codigo]
        newCodigo[idx] = e.target.value
        context.dispatchCodigo({ type: 'SET', value: newCodigo })
    }

    const handleInputCantidad = e => {
        let newCantidad = [...context.cantidad]
        newCantidad[idx] = e.target.value
        context.dispatchCantidad({ type: 'SET', value: newCantidad })
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
                Código
            </Text>
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Cantidad
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
                    value={context.codigo[idx] || ''}
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
                    value={context.cantidad[idx] || ''}
                    onChange={handleInputCantidad}
                    disabled={history}
                />
            </Cell>
        </div>
        </>
    )
}

export default TableDateFTQ