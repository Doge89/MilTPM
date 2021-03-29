import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Icon from '../../common/Icon'
import { IconsContainer } from '../../../styles/hxh'

function Icons(){

    const [materials, setMaterials] = useState(false)
    const [maintenance, setMaintenance] = useState(false)
    const [production, setProduction] = useState(false)
    const [engineery, setEngineery] = useState(false)
    const [quality, setQuality] = useState(false)
    const [change, setChange] = useState(false)

    const history = useHistory();

    const handleDefaultClick = (type) => history.push(`/andon?tipo=${type}`)

    useEffect(() => {
        const timerMaterials = localStorage.getItem('timerValuemateriales')
        const timerMaintenance = localStorage.getItem('timerValuemantenimiento')
        const timerProduction = localStorage.getItem('timerValueproduccion')
        const timerEngineery = localStorage.getItem('timerValueingenieria')
        const timerQuality = localStorage.getItem('timerValuecalidad')
        const timerChange = localStorage.getItem('timerValuecambio')

        if(timerMaterials){ setMaterials(true) }
        if(timerMaintenance){ setMaintenance(true) }
        if(timerProduction){ setProduction(true) }
        if(timerEngineery){ setEngineery(true) }
        if(timerQuality){ setQuality(true) }
        if(timerChange){ setChange(true) }

    }, [])

    return(
        <IconsContainer>
            <div className="row">
                <Icon 
                    name="materiales"
                    label="Materiales"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('materiales')}
                    active={materials}
                />
                <Icon 
                    name="mantenimiento"
                    label="Mantenimiento"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('mantenimiento')}
                    active={maintenance}
                />
                <Icon 
                    name="produccion"
                    label="Producción"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('produccion')}
                    active={production}
                />
                <Icon 
                    name="ingenieria"
                    label="Ingeniería"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('ingenieria')}
                    active={engineery}
                />
            </div>
            <div className="row">
                <Icon 
                    name="calidad"
                    label="Calidad"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('calidad')}
                    active={quality}
                />
                <Icon 
                    name="cambio"
                    label="Cambio modelo"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('cambio')}
                    active={change}
                />
            </div>
        </IconsContainer>
    )
}

export default Icons