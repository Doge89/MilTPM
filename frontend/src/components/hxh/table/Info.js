import React, { useContext, useEffect } from 'react'

import Input from '../../common/Input'

import { InfoContainer } from '../../../styles/hxh'

import { appContext } from '../../../reducers/ProviderHXH'

function Info({ prevInfo, history, lines, userType, selDisable }){

    const labels = ['Faltas', 'Linea', 'Incidencias', 'Consola', 'Bajas', 'Job', 'Entrenamiento', 'Mod']

    const context = useContext(appContext)

    const columns = ['', '', '', '']

    const handleInput = (e, i) => {
        switch(labels[i]){
            case 'Faltas': 
                if(e.target.value !== "none"){ return context.dispatchFaltas({ type: 'SET', value: e.target.value }) }
                break;
            case 'Linea': return context.dispatchLinea({ type: 'SET', value: e.target.value })
            case 'Incidencias': return context.dispatchIncidencias({ type: 'SET', value: e.target.value })
            case 'Consola': return context.dispatchConsola({ type: 'SET', value: e.target.value })
            case 'Bajas': return context.dispatchBajas({ type: 'SET', value: e.target.value })
            case 'Job': return context.dispatchJob({ type: 'SET', value: e.target.value })
            case 'Entrenamiento': return context.dispatchEntrenamiento({ type: 'SET', value: e.target.value })
            default: return context.dispatchMod({ type: 'SET', value: e.target.value })
        }
    }

    const getValue = i => {
        console.debug(context)
        switch(labels[i]){
            case 'Faltas': return context.faltas
            case 'Linea': return context.linea
            case 'Incidencias': return context.incidencias
            case 'Consola': return context.consola
            case 'Bajas': return context.bajas
            case 'Job': return context.job
            case 'Entrenamiento': return context.entrenamiento
            default: return context.mod
        }
    }

    useEffect(() => {
        // if(prevInfo !== undefined && "infGen" in prevInfo){
        //     console.info(prevInfo.infGen)
        // }
        // console.info(prevInfo)
        if(prevInfo?.faltas){ context.dispatchFaltas({ type: 'SET', value: prevInfo.faltas }) }
        if(prevInfo?.linea){ context.dispatchLinea({ type: 'SET', value: prevInfo.linea }) }
        if(prevInfo?.incidencias){ context.dispatchIncidencias({ type: 'SET', value: prevInfo.incidencias }) }
        if(prevInfo?.consola){ context.dispatchConsola({ type: 'SET', value: prevInfo.consola }) }
        if(prevInfo?.bajas){ context.dispatchBajas({ type: 'SET', value: prevInfo.bajas }) }
        if(prevInfo?.job){ context.dispatchJob({ type: 'SET', value: prevInfo.job }) }
        if(prevInfo?.entrenamiento){ context.dispatchEntrenamiento({ type: 'SET', value: prevInfo.entrenamiento }) }
        if(prevInfo?.mod){ context.dispatchMod({ type: 'SET', value: prevInfo.mod }) }
    },[prevInfo])

    return( 
        <InfoContainer>
            {columns.map((c, i) => (
                <div className='column' key={i}>
                    <Input 
                        value={getValue([i * 2])}
                        label={labels[i * 2]}
                        margin="0 0 1vw 0"
                        onChange={e => handleInput(e, i * 2)}
                        borderInput="1px solid black"
                        disabled={history || labels[i * 2] === 'Linea'}
                    />
                    
                    {labels[(i * 2) + 1] && (
                        labels[(i * 2) + 1] === "Linea" ? (
                            <div className="select-container">
                                <label>Linea: </label>
                                <select onChange={e => handleInput(e, (i * 2) + 1)} value={getValue([(i * 2) + 1])} disabled={userType === "production" || selDisable}>
                                    <option value="none">Seleccionar linea</option>
                                    {lines.map(line => (
                                        <option value={line} key={line}>{line}</option>
                                    ))}
                                </select>
                            </div>
                            
                        ) : (
                        <Input 
                            value={getValue([(i * 2) + 1])}
                            label={labels[(i * 2) + 1]}
                            margin="0"
                            onChange={e => handleInput(e, (i * 2) + 1)}
                            borderInput="1px solid black"
                            disabled={history || labels[(i * 2) + 1] === 'Linea'}
                        />
                        )
                    )}
                </div>
            ))}
        </InfoContainer>
    )
}

export default React.memo(Info);