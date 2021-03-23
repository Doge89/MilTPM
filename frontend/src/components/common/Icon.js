import React from 'react'

import { Container, Image, Text } from '../../styles/common'

import cambio from '../../assets/img/cambio.png'
import ingenieria from '../../assets/img/ingenieria.png'
import mantenimiento from '../../assets/img/mantenimiento.png'
import materiales from '../../assets/img/materiales.png'
import milwaukee from '../../assets/img/milwaukee.png'
import produccion from '../../assets/img/produccion.png'
import calidad from '../../assets/img/calidad.png'

function Icon({ name, label, margin, onClick, active }){

    const getIcon = () => {
        switch(name){
            case "cambio": return cambio
            case "ingenieria": return ingenieria
            case "mantenimiento": return mantenimiento
            case "materiales": return materiales
            case "milwaukee": return milwaukee
            case "produccion": return produccion
            case "calidad": return calidad
        }
    }

    return(
        <Container
            flexDirection="row"
            alignItems="center"
            cursor="pointer"
            margin={margin}
            onClick={onClick}
            bgColor={active ? 'rgb(254, 13, 46)' : 'transparent'}
            padding="1vh 1vw"
            borderRadius="0.5vw"
        >
            <Image 
                width="5vw"
                src={getIcon()}
            />
            <Text
                color={active ? "black" : 'rgb(83,83,83)'}
                margin="0 0 0 1vw"
                size="2vw"
            >{label}</Text>
        </Container>
    )
}

export default Icon