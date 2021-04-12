import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { LayoutContainer, Plane as PlaneComponent, Indicator } from '../../styles/layout'

import layout from '../../assets/img/layout.jpg'

import { URL, maxWidth } from '../../var'

function Plane(){

    const interval = useRef(null)
    const intervalColor = useRef()

    const [colorCambio, setColorCambio] = useState('white')
    const [lines, setLines] = useState([])
    const [currentColor, setCurrentColor] = useState([])

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
            case "cambio": return 'white'
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
            let lines = JSON.parse(lineas).map(item => { return { ...item.fields, id: item.pk, status: [] } })
            const nStatus = JSON.parse(status).map(item => { return { ...item.fields, id: item.pk } })

            for(let i = 0; i < nStatus.length; i++){
                const idx = lines.findIndex(item => item.id === nStatus[i].linea)
                lines[idx].status.push(nStatus[i].estatus)
            }

            lines = lines.map(item => { return { ...item, status: item.status.length === 0 ? ['ok'] : item.status } })
            setCurrentColor(new Array(lines.length).fill(0))
            setLines(lines)

        }).catch(e => console.log(e))
    }

    const handleLineBlink = () => {
        for(let i = 0; i < lines.length; i++){
            const domElement = document.getElementById(`line${lines[i].linea}`)
            if(lines[i].status.length === 1){ domElement.style.backgroundColor = getColor(lines[i].status[0]) }
            else{
                let newCurrentColor = [...currentColor]
                
                domElement.style.backgroundColor = getColor(lines[i].status[newCurrentColor[i]])
                if(newCurrentColor[i] + 1 > lines[i].status.length -1){ newCurrentColor[i] = 0 }
                else{ newCurrentColor[i] += 1 }
                setCurrentColor(newCurrentColor)
            }
        }
    }

    useEffect(() => {
        if(lines.length !== 0){
            if(lines.some(item => item.status.length > 1)){ interval.current = setInterval(handleLineBlink, 2000); }
            else{
                for(let i = 0; i < lines.length; i++){
                    
                    if(document.getElementById(`line${lines[i].linea}`)){
                        let color = getColor(lines[i].status[0])
                        document.getElementById(`line${lines[i].linea}`).style.backgroundColor = color
                    }   
                }
            }
        }
        
        return () => { window.clearInterval(interval.current) }
    }, [lines, currentColor])

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
                    <Indicator top="79%" left="40.2%" key={idx}>
                        {line.linea}
                    </Indicator>
                ))}
                </>
            ):(
                <PlaneComponent img={layout}>
                    {lines.map((line, idx) => (
                        line.linea === "MXC001" && <Indicator top="75%" left="77%" key={idx} id={`line${line.linea}`}/> 
                    ))}
                </PlaneComponent>
            )}
        </LayoutContainer>
    )
}

export default Plane