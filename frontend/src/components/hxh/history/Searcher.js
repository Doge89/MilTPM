import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Loader from "react-loader-spinner";

import { SearcherContainer } from '../../../styles/hxh'
import { Text } from '../../../styles/common'

import { URL } from '../../../var'

function Searcher({ setData, setFound }){

    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState('')

    const handleInput = e => setDate(e.target.value)

    const getData = async () => {
        const res = await axios({
            url: `${URL}/hxh/historial/get/`,
            method: 'POST',
            data: querystring.stringify({ fecha: date })
        })

        return res.data
    }

    const search = () => {
        setLoading(true)
        setErr(false)
        getData().then((data) => {
            console.log(data)
            setLoading(false)
            setFound(true)

            const infGen = JSON.parse(data.InfGen)
            const infProd = JSON.parse(data.InfProd).map(item => item.fields)

            setData({ InfGen: { infGen, linea: JSON.parse(data.Linea).linea }, InfProd: infProd })
        }).catch(e => {
            setLoading(false)
            setFound(false)
            setErr(true)
            setMessage('No se ha podido buscar la información debido a un error en el servidor')
            console.log(e)
        })
    }

    useEffect(() => {
        if(new Date(date).getFullYear() > 1000){ search() }
    }, [date])

    return(
        <SearcherContainer>
            <h1>Consulte el historial de JOBs</h1>
            <input 
                type="date"
                value={date}
                onChange={handleInput}
            />
            {err && <Text color="rgb(254, 13, 46)" size="1.2vw">{message}</Text>}
            {loading && (
                <Loader
                    type="TailSpin"
                    color="rgb(254, 13, 46)"
                    height={50}
                    width={50}
                />
            )}
        </SearcherContainer>
    )
}

export default Searcher