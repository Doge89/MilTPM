import React, { useEffect } from 'react'

import MainContainer from '../components/common/MainContainer'
import Plane from '../components/layout/Plane'

import { setRootStyle } from '../scripts'

function Layout(){

    useEffect(() => {
        setRootStyle()
    }, [])

    return(
        <MainContainer>
            <Plane />
        </MainContainer>
    )
}

export default Layout