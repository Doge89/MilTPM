import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import CardLegend from './CardLegend'

import { LayoutContainer, Plane as PlaneComponent, Indicator} from '../../styles/layout'

import { Legend } from '../../styles/layout'

import layout from '../../assets/img/layout.jpg'

import { URL, maxWidth } from '../../var'


function Plane(){

    const interval = useRef(null)
    const intervalData = useRef()
    const intervalStatus = useRef()
    const colorCambio = useRef()
    const currentColor = useRef()
    const intervalLine = useRef()

    const [lines, setLines] = useState([])
    const [infoFetched, setInfoFetched] = useState(false)

    const labels = ["Ok", "Materiales", "Mantenimiento", "Produccion", "Ingenieria", "Calidad", "Cambio Modelo", "Facilities", "PSI", "PSE"]
    const colors = ["green", "yellow", "rgb(254, 16, 43)", "purple", "cyan", "#F77000", "white", "#0054FF", "#CD00FF", "#FF0069"]

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
            if(date.getMinutes() % 5 === 0){ setLinesStatus() } 
        }, 1000)
    }

    const getColor = (name) => {
        switch(name?.toLowerCase()){
            case "cambio": return 'white'
            case "ingenieria": return 'cyan'
            case "mantenimiento": return 'rgb(254, 13, 46)'
            case "materiales": return 'yellow' 
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
            setLines(lines)
            if(!infoFetched){
                colorCambio.current = new Array(lines.length).fill('white')
                currentColor.current = new Array(lines.length).fill(0)
                intervalLine.current = new Array(lines.length).fill(null)
                setInfoFetched(true)
            }

        }).catch(e => console.log(e))
    }

    const getLeftLine = (line) => {
        switch(line){
            case "MXC001": return "86.5%"
            case "MXC002": return "81.25%"
            case "MXC003": return "78.5%"
            case "MXC004": return "73.75%"
            case "MXC005": return "24.5%"
            case "MXC006": return "75.5%"
            case "MXC007": return "70%"
            case "MXC008": return "64.75%"
            case "MXC009": return "42.5%"
            case "MXC010": return "83.5%"
            case "MXC011": return "69%"
            case "MXC012": return "23.5%"
            case "MXC013": return "36%"
            case "MXC014": return "69%"
            case "MXC015": return "25.5%"
            case "MXC016": return "36.75%"
            case "MXC017": return "29.75%"
            case "MXC018": return "33%"
            case "MXC019": return "62.5%"
        }
    }

    const getTopLine = (line) => {
        switch(line){
            case "MXC001": return "70%"
            case "MXC002": return "70%"
            case "MXC003": return "70%"
            case "MXC004": return "70%"
            case "MXC005": return "61%"
            case "MXC006": return "59%"
            case "MXC007": return "59%"
            case "MXC008": return "59%"
            case "MXC009": return "45%"
            case "MXC010": return "45%"
            case "MXC011": return "45%"
            case "MXC012": return "45%"
            case "MXC013": return "45%"
            case "MXC014": return "45%"
            case "MXC015": return "77%"
            case "MXC016": return "77%"
            case "MXC017": return "23%"
            case "MXC018": return "77%"
            case "MXC019": return "23%"
        }
    }

    const setLineColor = (color, i, domElement, newCurrentColor, oneStatus) =>{
        let newIntervalLine = [...intervalLine.current]
        let newColorCambio = [...colorCambio.current]

        if(color === "white"){
            if(oneStatus){
                newIntervalLine[i] = setInterval((domElement) => {
                    domElement.style.backgroundColor = newColorCambio[i] === 'white' ? 'red' : 'white'
                    newColorCambio[i] = newColorCambio[i] === 'white' ? 'red' : 'white'
                    colorCambio.current = newColorCambio[i]
                }, 500, domElement);
            }else{
                domElement.style.backgroundColor = getColor('mantenimiento')
                if(newIntervalLine[i]){
                    window.clearInterval(newIntervalLine[i])
                    newIntervalLine[i] = null
                    intervalLine.current = newIntervalLine[i]
                }
            }
        }else{
            domElement.style.backgroundColor = color
            if(newIntervalLine[i]){
                window.clearInterval(newIntervalLine[i])
                newIntervalLine[i] = null
                intervalLine.current = newIntervalLine[i]
            }
        }
        console.info(newCurrentColor)
        if(newCurrentColor[i] + 1 > lines[i].status.length -1){ return 0 }
        else{ return newCurrentColor[i] + 1 }

    }

    const handleLineBlink = () => {
        let newCurrentColor = [...currentColor.current]
        for(let i = 0; i < lines.length; i++){
            console.log(newCurrentColor)
            const domElement = document.getElementById(`line${lines[i].linea}`)
            const oneStatus = lines[i].status.length === 1
            newCurrentColor[i] = setLineColor(getColor(lines[i].status[newCurrentColor[i]]), i, domElement, newCurrentColor, oneStatus)
        }
        currentColor.current = newCurrentColor
    }

    useEffect(() => {
        if(lines.length !== 0 ){
            handleLineBlink()
            if(intervalStatus.current){ window.clearInterval(intervalStatus.current) }
            intervalStatus.current = setInterval(handleLineBlink, 1500);
        }
        
        return () => { window.clearInterval(interval.current) }
    }, [lines])

    useEffect(() => {
        checkHour()
        setLinesStatus()
        intervalData.current = setInterval(setLinesStatus, 6000);
        if(window.innerWidth <= maxWidth){ document.getElementById('root').style.overflowY = 'auto' }
        return () => {
            window.clearInterval(interval.current) 
            window.clearInterval(intervalData.current)
            window.clearInterval(intervalStatus.current) 
        }
    }, [])

    return(
        <>
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
                        <Indicator top={getTopLine(line.linea)} left={getLeftLine(line.linea)} key={idx} id={`line${line.linea}`}/>
                        //<Indicator top="45%" left="62.5%" key={idx} id={`line${line.linea}`}/>  
                    ))}
                </PlaneComponent>
            )}
        </LayoutContainer>
        <Legend>
            {labels.map((label, idx) => (
                <CardLegend 
                    title={label}
                    backColor={colors[idx]}
                />
            ))}
            
        </Legend>
        </>
    )
}

export default Plane