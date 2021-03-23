import React, { useEffect, useContext } from 'react'

import TableData from './TableData'

import { Row } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function TableRow({ columns, info, idx, length, history }){

    const context = useContext(appContext)

    useEffect(() => {
        const arrayZeros = new Array(length).fill('0')
        const arrayInputs = new Array(length).fill('')
        context.dispatchPlan({ type: 'SET', value: arrayZeros })
        context.dispatchActual({ type: 'SET', value: arrayZeros })
        context.dispatchDiferencia({ type: 'SET', value: arrayZeros })
        context.dispatchCodigo({ type: 'SET', value: arrayInputs })
        context.dispatchDescripcion({ type: 'SET', value: arrayInputs })
        context.dispatchComentario({ type: 'SET', value: arrayInputs })
        context.dispatchContramedida({ type: 'SET', value: arrayInputs })
    }, [length])

    return(
        <Row borderBottom={idx === length -1 ? "1px solid rgb(83, 83, 83)" : '0'}>
            {columns.map((column, i) => (
                <TableData 
                    width={column.width}
                    height="10vh"
                    key={i}
                    subtitles={column.subtitles}
                    subtitlesCentered={column.subtitlesCentered}
                    title={column.title}
                    info={info}
                    idx={idx}
                    history={history}
                />
            ))}
        </Row>
    )
}

export default TableRow