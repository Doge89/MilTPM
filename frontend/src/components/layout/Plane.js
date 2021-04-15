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

    const getLeftLine = (line) => {
        switch(line){
            case "MXC001": return "77%"
            case "MXC002": return "73.25%"
            case "MXC003": return "69.5%"
            case "MXC004": return "65.75%"
            case "MXC005": return "24.5%"
            case "MXC006": return "83.5%"
            case "MXC007": return "76.5%"
            case "MXC008": return "69.5%"
            case "MXC009": return "42.5%"
            case "MXC010": return "83.5%"
            case "MXC011": return "72.25%"
            case "MXC012": return "14.75%"
            case "MXC013": return "31.5%"
            case "MXC014": return "69%"
            case "MXC015": return "17.5%"
            case "MXC016": return "32.5%"
            case "MXC017": return "23%"
            case "MXC018": return "27.5%"
            case "MXC019": return "66.75%"
        }
    }

    const getTopLine = (line) => {
        switch(line){
            case "MXC001": return "70%"
            case "MXC002": return "70%"
            case "MXC003": return "70%"
            case "MXC004": return "70%"
            case "MXC005": return "61%"
            case "MXC006": return "45%"
            case "MXC007": return "45%"
            case "MXC008": return "45%"
            case "MXC009": return "40%"
            case "MXC010": return "23%"
            case "MXC011": return "23%"
            case "MXC012": return "23%"
            case "MXC013": return "23%"
            case "MXC014": return "23%"
            case "MXC015": return "74%"
            case "MXC016": return "74%"
            case "MXC017": return "23%"
            case "MXC018": return "74%"
            case "MXC019": return "23%"
        }
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
                        //<Indicator top={getTopLine(line.linea)} left={getLeftLine(line.linea)} key={idx} id={`line${line.linea}`}/>
                        <Indicator top="61%" left="24.25%" key={idx} id={`line${line.linea}`}/>  
                    ))}
                </PlaneComponent>
            )}
        </LayoutContainer>
    )
}

export default Plane