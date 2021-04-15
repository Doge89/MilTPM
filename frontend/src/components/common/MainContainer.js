import React from 'react'

import TopBar from './TopBar'
import Footer from './Footer'

function MainContainer({ children, type }){
    return(
        <div id="app">
            <TopBar />
            {children}
            {!type && <Footer />}
        </div>
    )
}

export default MainContainer;