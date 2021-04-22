import React, { useEffect } from 'react'

import MainContainer from '../components/common/MainContainer'
import History from '../components/hxh/history/History'

import { setRootStyle } from '../scripts'

function HxhHistory(){

    useEffect(() => {
        console.log('a')
        setRootStyle(true)
    }, [])
    
    return(
        <MainContainer>
            <History />
        </MainContainer>
    )
}

export default HxhHistory