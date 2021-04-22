import React, { useState } from 'react'

import Searcher from './Searcher'
import Table from '../table/Table'
import Info from '../table/Info'

import { TableContainer } from '../../../styles/hxh'

function History(){

    const [data, setData] = useState({})
    const [found, setFound] = useState(false)

    return(
        <TableContainer padding="0 0 5vh 0">
            <Searcher 
                setFound={setFound}
                setData={setData}
            />
            {found && (
                <>
                <Info prevInfo={data.InfGen} history />
                <Table hxhHistory data={data.InfProd}/>
                </>
            )}
        </TableContainer>
    )
}

export default History