import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

import Icon from '../../common/Icon'
import { IconsContainer } from '../../../styles/hxh'

function Icons({ rerender, userType, linea, rerenderIcons }){

    const [materials, setMaterials] = useState(false)
    const [maintenance, setMaintenance] = useState(false)
    const [production, setProduction] = useState(false)
    const [engineery, setEngineery] = useState(false)
    const [quality, setQuality] = useState(false)
    const [change, setChange] = useState(false)

    const history = useHistory();

    const handleDefaultClick = (type) => history.push(`/andon?tipo=${type}${userType === 'admin' ? `&linea=${linea}` : ''}`)

    useEffect(() => {
        console.log(rerenderIcons)
        const timerMaterials = localStorage.getItem('timerValuemateriales')
        const timerMaintenance = localStorage.getItem('timerValuemantenimiento')
        const timerProduction = localStorage.getItem('timerValueproduccion')
        const timerEngineery = localStorage.getItem('timerValueingenieria')
        const timerQuality = localStorage.getItem('timerValuecalidad')
        const timerChange = localStorage.getItem('timerValuecambio')

        if(timerMaterials){ setMaterials(true) }
        else{ setMaterials(false) }

        if(timerMaintenance){ setMaintenance(true) }
        else{ setMaintenance(false) }

        if(timerProduction){ setProduction(true) }
        else{ setProduction(false) }

        if(timerEngineery){ setEngineery(true) }
        else{ setEngineery(false) }

        if(timerQuality){ setQuality(true) }
        else{ setQuality(false) }
        
        if(timerChange){ setChange(true) }
        else{ setChange(false) }

    }, [rerender, rerenderIcons])

    return(
        <IconsContainer>
            <div className="row">
                <Icon 
                    name="materiales"
                    label="Materiales"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('materiales')}
                    active={materials}
                    borderColor="yellow"
                />
                <Icon 
                    name="mantenimiento"
                    label="Mantenimiento"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('mantenimiento')}
                    active={maintenance}
                    borderColor="red"
                />
                <Icon 
                    name="produccion"
                    label="Producción"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('produccion')}
                    active={production}
                    borderColor="purple"
                />
                <Icon 
                    name="ingenieria"
                    label="Ingeniería"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('ingenieria')}
                    active={engineery}
                    borderColor="cyan"
                />
            </div>
            <div className="row">
                <Icon 
                    name="calidad"
                    label="Calidad"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('calidad')}
                    active={quality}
                    borderColor="#F77000"
                />
                <Icon 
                    name="cambio"
                    label="Cambio modelo"
                    margin="0 1vw"
                    onClick={() => handleDefaultClick('cambio')}
                    active={change}
                    borderColor="red"
                />
            </div>
        </IconsContainer>
    )
}

export default Icons