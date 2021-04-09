import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { LayoutContainer, Plane as PlaneComponent, Indicator } from '../../styles/layout'

import layout from '../../assets/img/layout.jpeg'

import { URL, maxWidth } from '../../var'

function Plane(){

    const interval = useRef(null)
    const intervalColor = useRef()

    const [colorCambio, setColorCambio] = useState('white')
    const [lines, setLines] = useState([])

    const fetchSession = async () => {
        const res = await axios({
            url: `${URL}/login/validate`,
            method: 'GET'
        })

        return res.data
    }

    const getData = async () => {
        const res = await axios({
            url: `${URL}/layout/status/`,
            method: 'GET'
        })

        return res.data
    }

    const refreshSession = () => {
        fetchSession().then(() => {})
        .catch(e => console.log(e))
    }

    const checkHour = () => {
        interval.current = setInterval(() => {
            const date = new Date()
            if(date.getMinutes() === 0){ refreshSession() }
            if(date.getMinutes() % 5 === 0){ /*setLinesStatus() */ } 
        }, 1000)
    }

    const getColor = (name) => {
        switch(name?.toLowerCase()){
            case "cambio": return colorCambio
            case "ingenieria": return 'cyan'
            case "mantenimiento": return 'rgb(254, 13, 46)'
            case "materiales": return 'blue' 
            case "produccion": return 'purple'
            case "materiales": return '#FF7000'
            default: return 'green'
        }
    }

    const setLinesStatus = () => {
        getData().then(({ lineas, status }) => {
            //setLines(lines)
            let lines = JSON.parse(lineas).map(item => { return { ...item.fields, id: item.pk, status: 'ok' } })
            const nStatus = JSON.parse(status).map(item => { return { ...item.fields, id: item.pk } })

            for(let i = 0; i < nStatus.length; i++){
                const idx = lines.findIndex(item => item.id === nStatus[i].linea)
                lines[idx].status = nStatus[i].estatus
            }
            setLines(lines)

        }).catch(e => console.log(e))
    }

    useEffect(() => {
        checkHour()
        setLinesStatus()
        if(window.innerWidth <= maxWidth){ document.getElementById('root').style.overflowY = 'auto' }
        return () => {
            clearInterval(interval.current) 
        }
    }, [])

    return(
        <LayoutContainer>
            <h1>Líneas de producción</h1>
            {window.innerWidth <= maxWidth ? (
                <>
                {lines.map((line, idx) => (
                    <Indicator color={getColor(line.status)} top="79%" left="40.2%" key={idx}>
                        {line.linea}
                    </Indicator>
                ))}
                </>
            ):(
                <PlaneComponent img={layout}>
                    {lines.map((line, idx) => (
                        line.linea === "MXC001" ? <Indicator color={getColor(line.status)} top="79%" left="40.2%" key={idx}/> :
                        line.linea === "MXC002" && <Indicator color={getColor(line.status)} top="79%" left="36.4%" key={idx}/>
                    ))}
                </PlaneComponent>
            )}
        </LayoutContainer>
    )
}

export default Plane