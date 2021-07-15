import React, { useContext } from 'react'

import Input from '../../common/Input'

import { Cell } from '../../../styles/hxh'
import { Text } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

function TableDataHour({ info, getWidthCell, idx, history }){

    const context = useContext(appContext)

    const handleInput = e => {
        console.info("Plan handle Input")
        let newPlan = [...context.plan]
        newPlan[idx] = Math.floor(e.target.value)
        context.dispatchPlan({ type: 'SET', value: newPlan })
    }

    const getCurrentPlan = () => {
        let total = 0
        for(let i = 0; i < idx + 1; i++){
            total += Number(context.plan[i])
        }
        return isNaN(total) ? '' : total
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
                Inicio
            </Text>
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Fin
            </Text>
            <Text
                width={getWidthCell()}
                color="rgb(150, 150, 150)"
                size="5vw"
                align="center"
            >
                Plan
            </Text>
        </div>
        <div className="table-data-container">
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
                className="no-border-left"
            >
                <p>{info.start}</p>
            </Cell>
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
            >
                <p>{info.end}</p>
            </Cell>
            <Cell
                width={getWidthCell()}
                borderTop={idx === 0 ? '1px solid rgba(83, 83, 83, 0.2)' : '1px solid rgb(83, 83, 83)'}
            >
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    value={context.plan[idx] || ''}
                    onChange={handleInput}
                    type="number"
                    disabled={history}
                />
                <p className="slash">/</p>
                <Input 
                    width="80%"
                    woLabel
                    inputClassName="border-bottom text-align"
                    value={getCurrentPlan()}
                    disabled
                    className="second-input"
                    inputPadding="0"
                />
            </Cell>
        </div>
        </>
    )
}

export default React.memo(TableDataHour)