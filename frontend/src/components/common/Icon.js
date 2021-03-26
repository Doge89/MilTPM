import React, { useState, useRef, useEffect } from 'react'

import { Container, Image, Text } from '../../styles/common'

import cambio from '../../assets/img/cambio.png'
import ingenieria from '../../assets/img/ingenieria.png'
import mantenimiento from '../../assets/img/mantenimiento.png'
import materiales from '../../assets/img/materiales.png'
import milwaukee from '../../assets/img/milwaukee.png'
import produccion from '../../assets/img/produccion.png'
import calidad from '../../assets/img/calidad.png'

function Icon({ name, label, margin, onClick, active }){

    const interval = useRef()

    const [colorCambio, setColorCambio] = useState('white')

    const getColor = () => {
        switch(name){
            case "cambio": return colorCambio
            case "ingenieria": return 'cyan'
            case "mantenimiento": return 'rgb(254, 13, 46)'
            case "materiales": return 'blue'
            case "milwaukee": return milwaukee
            case "produccion": return 'purple'
            default: return '#FF7000'
        }
    }

    const getIcon = () => {
        switch(name){
            case "cambio": return cambio
            case "ingenieria": return ingenieria
            case "mantenimiento": return mantenimiento
            case "materiales": return materiales
            case "milwaukee": return milwaukee
            case "produccion": return produccion
            default: return calidad
        }
    }

    useEffect(() => {
        if(active){
            interval.current =setInterval(() => {
                if(colorCambio === 'white'){ setColorCambio('rgb(254, 13, 46)') }
                else{ setColorCambio('white') }
            }, 1000);
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [active, colorCambio])

    return(
        <Container
            flexDirection="row"
            alignItems="center"
            cursor="pointer"
            margin={margin}
            onClick={onClick}
            bgColor={active ? getColor() : 'green'}
            padding="1vh 1vw"
            borderRadius="0.5vw"
        >
            <Image 
                width="5vw"
                src={getIcon()}
            />
            <Text
                color={active ? name === 'cambio' ? 'black' : 'white' : 'white'}
                margin="0 0 0 1vw"
                size="2vw"
            >{label}</Text>
        </Container>
    )
}

export default Icon