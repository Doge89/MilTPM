import React, { useEffect, useRef, useState } from 'react'

import { LegendContainer } from '../../styles/layout'

function CardLegend( {title, backColor} ){

    const [backgroundColor, setBackGroundColor] = useState(backColor || "")

    const interval = useRef(null)

    useEffect(() =>{
        if(title === "Cambio Modelo"){
            interval.current = setInterval(() =>{
                if(backgroundColor === "white"){
                    setBackGroundColor("rgb(254, 13, 46)")
                }else{setBackGroundColor("white")}
            }, 1000)
        }
        return () => {clearInterval(interval.current)}
    }, [backgroundColor])

    return (
        <LegendContainer>
            <div style={{backgroundColor: title !== "Cambio Modelo" ? backColor : backgroundColor}} />
            <span>{title}</span>
        </LegendContainer>
    )

}

export default CardLegend