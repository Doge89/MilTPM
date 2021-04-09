import React, { useState, useEffect } from 'react';

import MainContainer from '../components/common/MainContainer'
import Info from '../components/hxh/table/Info'
import Table from '../components/hxh/table/Table'

import { setRootStyle } from '../scripts'

function Hxh(){

    const [rerender, setRerender] = useState(false)
    const [generalInfo, setGeneralInfo] = useState({})
    
    useEffect(() => {
        setRootStyle()
        
    }, [])

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