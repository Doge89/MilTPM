import React from 'react'

import TopBar from './TopBar'

function MainContainer({ children }){
    return(
        <div id="app">
            <TopBar />
            {children}
        </div>
    )
}

export default MainContainer;