import React from 'react'

import TopBar from './TopBar'
import Footer from './Footer'

function MainContainer({ children }){
    return(
        <div id="app">
            <TopBar />
            {children}
            <Footer />
        </div>
    )
}

export default MainContainer;