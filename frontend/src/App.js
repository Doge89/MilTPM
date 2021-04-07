import React, { useEffect } from 'react'

import GlobalStyles from './styles/globalStyles'
import Router from './Router'

function App() {

    useEffect(() => {
        /* setTimeout(function () {
            let viewheight = window.innerHeight;
            let viewwidth = window.innerWidth
            let viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
        }, 300); */
        document.getElementsByTagName('html')[0].style.height = `${window.innerHeight}px`
        document.getElementById('root').style.height = `${window.innerHeight}px`
    }, [])

    return (
        <>
        <GlobalStyles />
        <Router/>
        </>
    );
}

export default App;
