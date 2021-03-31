import React, { useEffect } from 'react'

import Router from './Router'

function App() {

    useEffect(() => {
        setTimeout(function () {
            let viewheight = window.innerHeight;
            let viewwidth = window.innerWidth
            let viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
        }, 300);
    }, [])

    return (
        <Router/>
    );
}

export default App;
