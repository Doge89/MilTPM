import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { PanelTableCell } from '../../styles/tpm'
import { URL } from '../../var'

function StaffItem({ key, name, idx, date, hour, viewType, 
                    width, timeStamp, status, is_status }){

    const [ reKey, setReKey ] = useState([])
    const [ statHist, setStatHist ] = useState('')
    const [ reformTimestamp, setReformTimestamp ] = useState('')

    const refecthUserKeys = async () => {
        const response = await axios({
            url: `${URL}/users/get/`,
            method: "GET"
        })
        return response.data
    }

    const handleRequest = () => {
        refecthUserKeys()
        .then(({ key }) => {
            setReKey(key)
        })
        .catch(error => console.error(error))
    }

    useEffect(() =>{
        if(key === undefined){
            handleRequest()
        }
    }, [key, name, idx])

    useEffect(() => {
        console.log(timeStamp, (new Date(timeStamp)).toLocaleString("es-MX"))
        setReformTimestamp((new Date(timeStamp)).toLocaleString("es-MX"))
        if(status !== ""){
            switch(status){
                case "IN" : return setStatHist("Entrada")
                case "OFF": return setStatHist("Salida")
                default : return ""
            }
        }
    }, [status])

    return(
        <div className="table-row border-none" key={idx}>
            <PanelTableCell width={width} className="border-right border-bottom border-left move-left">
                <div>
                    <span>{viewType === "Register" ? key !== undefined ? key : reKey[idx] : name}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell width={width} className="border-right border-bottom move-left email">{viewType === "Register" ? name : is_status ? `${reformTimestamp}` : `${date} ${hour}`}</PanelTableCell>
            {is_status && (
                <PanelTableCell width={width} className="border-right border-bottom move-left">{statHist}</PanelTableCell>
            )}
        </div>
    )

}

export default StaffItem