import React, { useState } from 'react'

import Searcher from './Searcher'
import Table from '../table/Table'
import Info from '../table/Info'

import { TableContainer } from '../../../styles/hxh'

function History(){

    const [data, setData] = useState({consola: 'asdasd', linea: '1', incidencias: '50', faltas: '12', 
                                bajas: 'asdasd', job: '12asdas', entrenamiento: 'asdasd0', mod: 'asdasdasd', 
                                plan: [{ from : 6, to: 7, value: 150 }, { from : 7, to: 8, value: 200 }, { from : 8, to: 9, value: 120 }],
                                actual: [{ from : 6, to: 7, value: 125 }, { from : 7, to: 8, value: 210 }, { from : 8, to: 9, value: 130 }],
                                difference: [{ from : 6, to: 7, value: -25 }, { from : 7, to: 8, value: 10 }, { from : 8, to: 9, value: 10 }],
                                timeout: [{ from : 6, to: 7, value: '2:20' }, { from : 7, to: 8, value: '00:00' }, { from : 8, to: 9, value: '00:00' }],
                                code: [{ from : 6, to: 7, value: '120' }, { from : 7, to: 8, value: '555' }, { from : 8, to: 9, value: '710' }],
                                quantity: [{ from : 6, to: 7, value: '100' }, { from : 7, to: 8, value: '100' }, { from : 8, to: 9, value: '100' }],
                                description: [{ from : 6, to: 7, value: 'Lorem ipsum' }, { from : 7, to: 8, value: 'Lorem ipsum' }, { from : 8, to: 9, value: 'Lorem ipsum' }],
                                contramedida: [{ from : 6, to: 7, value: 'Lorem ipsum'}, { from : 7, to: 8, value: 'Lorem ipsum' }, { from : 8, to: 9, value: 'Lorem ipsum' }],
                                comments: [{ from : 6, to: 7, value: 'Lorem ipsum' }, { from : 7, to: 8, value: 'Lorem ipsum' }, { from : 8, to: 9, value: 'Lorem ipsum' }]})
    const [found, setFound] = useState(true)

    return(
        <TableContainer padding="0 0 5vh 0">
            <Searcher 
                setFound={setFound}
                setData={setData}
            />
            {found && (
                <>
                <Info prevInfo={data} history />
                <Table hxhHistory data={data}/>
                </>
            )}
        </TableContainer>
    )
}

export default History