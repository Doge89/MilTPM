import React from 'react'

import TopBar from './TopBar'

function MainContainer({ children }){
    return(
        <>
            <TopBar />
            {children}
        </>
    )
}

export default MainContainer;