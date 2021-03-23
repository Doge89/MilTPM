import React, { useEffect, useState } from 'react';

import MainContainer from '../components/common/MainContainer'
import Info from '../components/hxh/table/Info'
import Table from '../components/hxh/table/Table'

function Hxh(){

    const [rerender, setRerender] = useState(false)

    return (
        <MainContainer>
            <Info />\
            <Table setRerender={setRerender} rerender={rerender} />
        </MainContainer>
    )
}

export default Hxh;