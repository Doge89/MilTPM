import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { LayoutContainer, Plane as PlaneComponent, Indicator } from '../../styles/layout'

import layout from '../../assets/img/layout.jpeg'

import { URL } from '../../var'

function Plane(){

    const interval = useRef(null)

    const [lines, setLines] = useState([{ nombre: 'MXC001', status: 'ok' }])

    const fetchSession = async () => {
        const res = await axios({
            url: `${URL}/login/validate`,
            method: 'GET'
        })

        return res.data
    }

    const getData = async () => {
        const res = await axios({
            url: `${URL}/layout`,
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

    const setLinesStatus = () => {
        getData().then(data => {
            setLines(lines)
        }).catch(e => console.log(e))
    }

    const getColor = status => {
        switch(status){
            case "ok": return 'green'
            default: return ''
        }
    }

    useEffect(() => {
        checkHour()
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    return(
        <LayoutContainer>
            <h1>Líneas de producción</h1>
            <PlaneComponent img={layout}>
                {lines.map((line, idx) => (
                    line.nombre === 'MXC001' && <Indicator color={getColor(line.status)} top="79%" left="40.2%" key={idx}/>
                ))}
            </PlaneComponent>
        </LayoutContainer>
    )
}

export default Plane