import React, { useState } from 'react';

import MainContainer from '../components/common/MainContainer'
import Info from '../components/hxh/table/Info'
import Table from '../components/hxh/table/Table'

function Hxh(){

    const [rerender, setRerender] = useState(false)
    const [generalInfo, setGeneralInfo] = useState({})

    return (
        <MainContainer>
            <Info prevInfo={generalInfo} />
            <Table 
                setRerender={setRerender} 
                rerender={rerender} 
                setGeneralInfo={setGeneralInfo}
            />
        </MainContainer>
    )
}

export default Hxh;