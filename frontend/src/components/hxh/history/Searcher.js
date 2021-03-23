import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { SearcherContainer } from '../../../styles/hxh'

import { URL } from '../../../var'

function Searcher({ setData, setFound }){

    const [date, setDate] = useState('')

    const handleInput = e => setDate(e.target.value)

    const getData = async () => {
        const res = await axios({
            url: `${URL}/jobs?date=${date}`,
            method: 'GET'
        })

        return res.data
    }

    const search = () => {
        getData().then((data) => {
            setFound(true)
            setData(data)
        }).catch(e => {
            setFound(false)
            console.log(e)
        })
    }

    useEffect(() => {
        //if(new Date(date).getFullYear() > 1000){ search() }
    }, [date])

    return(
        <SearcherContainer>
            <h1>Consulte el historial de JOBs</h1>
            <input 
                type="date"
                value={date}
                onChange={handleInput}
            />
        </SearcherContainer>
    )
}

export default Searcher