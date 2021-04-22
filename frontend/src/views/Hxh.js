import React, { useState, useEffect } from 'react';

import MainContainer from '../components/common/MainContainer'
import Info from '../components/hxh/table/Info'
import Table from '../components/hxh/table/Table'

import { setRootStyle } from '../scripts'

function Hxh(){

    const [rerender, setRerender] = useState(false)
    const [generalInfo, setGeneralInfo] = useState({})
    const [lines, setLines] = useState([])
    const [userType, setUserType] = useState('')
    
    useEffect(() => {
        setRootStyle()
        
    }, [])

    return (
        <MainContainer>
            <Info 
                prevInfo={generalInfo} 
                lines={lines} 
                userType={userType}
            />
            <Table 
                setRerender={setRerender} 
                rerender={rerender} 
                setGeneralInfo={setGeneralInfo}
                setLines={setLines}
                setInfoUserType={setUserType}
            />
        </MainContainer>
    )
}

export default Hxh;