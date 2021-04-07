import React, { useState, useEffect } from 'react';

import MainContainer from '../components/common/MainContainer'
import Info from '../components/hxh/table/Info'
import Table from '../components/hxh/table/Table'

import { maxWidth } from '../var'

function Hxh(){

    const [rerender, setRerender] = useState(false)
    const [generalInfo, setGeneralInfo] = useState({})

    useEffect(() => {
        document.getElementById('root').style.overflowY = 'auto'
        if(window.innerWidth <= maxWidth){
            document.getElementById('root').style.backgroundColor = 'black'
            document.getElementsByTagName('body')[0].style.overflowX = 'hidden'
        }
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