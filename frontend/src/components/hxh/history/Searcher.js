import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Loader from "react-loader-spinner";
import Cookies from 'js-cookie'

import { SearcherContainer } from '../../../styles/hxh'
import { Text } from '../../../styles/common'
import LineSearcher from './LineSearcher';

import { URL } from '../../../var'

function Searcher({ setData, setFound }){

    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState('')
    const [lines, setLines] = useState([])
    const [selLine, SetSelLine] = useState('')

    const handleLine = e => SetSelLine(e.target.value)

    const handleInput = (e) => {setDate(e.target.value)}

    const getData = async () => {
        const res = await axios({
            url: `${URL}/hxh/historial/get/`,
            method: 'POST',
            data: querystring.stringify({ fecha: date, linea: selLine }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const getLines = async () =>{
        const response = await axios({
            url: `${URL}/hxh/all/lines/`,
            method: 'GET'
        })

        return response.data
    }

    const handleGetLines = () =>{
        getLines().then((data) => {
            setLines(data.lineas)
        }).catch(e => console.error(e))
    }

    const search = () => {
        setLoading(true)
        setErr(false)
        getData().then((data) => {
            console.log(data)
            setLoading(false)
            setFound(true) //! ERROR LINE yes 
            console.log(JSON.parse(data.Linea)[0].fields.linea)
            const infGen = JSON.parse(data.InfGen)
            const infProd = JSON.parse(data.InfProd).map(item => item.fields)
            console.log(infGen)
            console.log(infProd)
            setData({ InfGen: { infGen, linea: JSON.parse(data.Linea)[0].fields.linea}, InfProd: infProd })
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
        handleGetLines()
    }, [date])

    useEffect(() =>{
        console.log(selLine)
    }, [selLine])

    return(
        <SearcherContainer>
            <h1>Consulte el historial de JOBs</h1>
            <select
                onChange={handleLine}
            >
                <option value = ""
                >
                    Seleccione una opcion
                    
                </option>
                <option value="MXC001">MXC001</option>
            </select>
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