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


    //? VERIFICATION PURPOSE
    useEffect(() =>{
        console.info(data)
        console.log(data.InfProd) // CAN BE linea PROPERTY
        console.log(data.InfGen)
    }, [data])

    useEffect(() =>{
        getLines().then((data) =>{
            setLines(data.lineas)
            console.log(data.lineas)
        })
    }, [])

    return(
        <TableContainer padding="0 0 5vh 0">
            <Searcher 
                setFound={setFound}
                setData={setData}
                machLines={lines}
                setLines={setLines}
            />
            {found && (
                <>
                <Info selDisable={true} prevInfo={data.InfGen !== undefined && "infGen" in data.InfGen ? data.InfGen.infGen : {}} lines={lines} history={true}/>
                <Table hxhHistory={true} data={data.InfProd}/>
                </>
            )}
        </TableContainer>
    )
}

export default History