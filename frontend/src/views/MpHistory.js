import React, { useState } from 'react'

import MainContainer from '../components/common/MainContainer'
import Searcher from '../components/mp/history/Searcher'
import Table from '../components/mp/history/Table'

function MpHistory(){

    const [data, setData] = useState([])
    const [searched, setSearched] = useState(false)

    return(
        <MainContainer>
            <Searcher setData={setData} setSearched={setSearched} />
            <Table searched={searched} data={data} />
        </MainContainer>
    )
}

export default MpHistory