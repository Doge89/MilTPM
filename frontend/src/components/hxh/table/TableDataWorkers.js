import React, { useContext, useEffect, useState } from 'react'

import { Cell } from '../../../styles/hxh'
import Input from '../../common/Input'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataWorkers({ getWidthCell, idx, history }){

    const context = useContext(appContext)

    return(
        <Cell
            width={getWidthCell()}
            borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
        >
            <Input 
                width="80%"
                woLabel
                inputClassName="border-bottom"
                value={context.worker[idx]}
                disabled={true}
                inputClassName="text-align"
            />
        </Cell>
    )

}   

export default TableDataWorkers