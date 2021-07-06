import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Searcher from './Searcher'
import Table from '../table/Table'
import Info from '../table/Info'

import { URL } from '../../../var'
import { TableContainer } from '../../../styles/hxh'

function History(){

    const [data, setData] = useState({})
    const [found, setFound] = useState(false)
    const [lines, setLines] = useState([])

    const getLines = async () => {
        const response = await axios({
            url: `${URL}/hxh/all/lines/`,
            method: "GET"
        })

        return response.data
    }

    const handleLines = () => {
        getLines().then((data) => {
            console.log(data.lineas)
            setLines(data.lineas)
        })
    }

    //? VERIFICATION PURPOSE
    useEffect(() =>{
        console.log(data.InfProd) // CAN BE linea PROPERTY
        console.log(data.InfGen)
        handleLines()
    }, [data])

    return(
        <TableContainer padding="0 0 5vh 0">
            <Searcher 
                setFound={setFound}
                setData={setData}
            />
            {found && (
                <>
                <Info selDisable={true} prevInfo={data.InfGen} lines={lines} history/>
                <Table HxhHistory data={data.InfProd}/>
                </>
            )}
        </TableContainer>
    )
}

export default History