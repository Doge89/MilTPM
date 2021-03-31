import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { SearcherContainer } from '../../../styles/mp'
import { CardInfo } from '../../../styles/tpm'

import { URL } from '../../../var'

function Searcher({ setData, setSearched }){

    const [line, setLine] = useState('MXC001')
    const [turno, setTurno] = useState('A')
    const [date, setDate] = useState('')

    const handleSelectLine = e => setLine(e.target.value)
    const handleSelectTurno = e => setTurno(e.target.value)
    const handleInputDate = e => setDate(e.target.value)

    const getData = async () => {
        const res = await axios({
            url: `${URL}?date=${date}&line=${line}&turno=${turno}`,
            method: 'GET'
        })

        return res.data
    }

    useEffect(() => {
        if(date !== ''){
            setSearched(true)
            getData().then((data) => {
                setData(data)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [line, turno, date])

    return(
        <SearcherContainer>
            <h1>Consulte el historial del MP</h1>
            <div className="inputs-container">
                <CardInfo widthLabel="28vw" width="25vw">
                    <label>Seleccione una línea:</label>
                    <select value={line} onChange={handleSelectLine}>
                        <option value="MXC001">MXC001</option>
                        <option value="MXC002">MXC002</option>
                        <option value="MXC003">MXC003</option>
                        <option value="MXC004">MXC004</option>
                        <option value="MXC001">MXC005</option>
                        <option value="MXC006">MXC006</option>
                    </select>
                </CardInfo>
                <CardInfo widthLabel="28vw" width="25vw">
                    <label>Seleccione el turno</label>
                    <select value={turno} onChange={handleSelectTurno}>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                    </select>
                </CardInfo>
                <CardInfo widthLabel="28vw" width="25vw">
                    <label>Seleccione un día</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={handleInputDate}
                    />
                </CardInfo>
            </div>
        </SearcherContainer>
    )
}

export default Searcher