import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { URL } from '../../../var'

function LineSearcher( { prodLines } ){

    const [lines, setLines] = useState([])

    const getLines = async () =>{
        const response = await axios({
            url: `${URL}/hxh/all/lines/`,
            method: 'GET'
        })

        return response.data
    }

    const handleLines = () => {
        getLines().then((data) =>{
            setLines(data.lineas)
        })
    }

    useEffect(() => {
        handleLines()
        console.log(prodLines)
    }, [])

    return (
        <>
            <select>
                <option value="MXC001">MXC001</option>
            </select>
        </>
    )

}

export default LineSearcher