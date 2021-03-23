import React, { useContext, useEffect } from 'react' 
import axios from 'axios'
import querystring from 'querystring'
import { history, useHistory } from 'react-router-dom'

import TableHeadRow from './TableHeadRow'
import TableRow from './TableRow'
import Icons from './Icons'

import { TableContainer, Row } from '../../../styles/hxh'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

import { columns, scheduleA, scheduleB, scheduleC, URL } from '../../../var'

function Table({ setRerender, rerender, hxhHistory, data }){

    let timeout

    const date = new Date()

    const context = useContext(appContext) 

    const history = useHistory()

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/jobs/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        return res.data
    }

    const getData = async () => {
        const res = await axios({
            url: `${URL}/Vistas/`,
            method: 'GET'
        })

        return res.data
    }

    const handleBtn = () => {
        const data = {
            actual: JSON.stringify(context.actual), diferencia: JSON.stringify(context.diferencia),
            codigo: JSON.stringify(context.codigo), descripcion: JSON.stringify(context.descripcion), 
            comentario: JSON.stringify(context.comentario), plan: JSON.stringify(context.plan), 
            faltas: context.faltas, linea: context.linea, incidencias: context.incidencias,
            mod: context.mod, entrenamiento: context.entrenamiento, bajas: context.bajas,
            consola: context.consola, contramedida: context.contramedida, job: context.job
        }
        postData(data).then(() => {
            window.location.reload()
        }).catch(e => console.log(e))
    }

    const gotoHistory = () => history.push('/hxh/historial')

    const checkHour = () => {
        const date = new Date()
        if((date.getHours() === 6 ||  date.getHours() === 13 || date.getHours() === 23) && date.getMinutes() === 0){
            setRerender(!rerender)
        }
        timeout = setTimeout(checkHour, 1000 * 60)
    }

    useEffect(() => {
        /* getData().then((data) => {
            console.log(data)
        }).catch(e => console.log(e)) */
        if(!history){ checkHour() }
        return () => { clearTimeout(timeout) }
    }, [])

    return(
        <TableContainer>
            <TableHeadRow columns={columns} />
            {hxhHistory ? [...scheduleA, ...scheduleB, ...scheduleC].map(( hours, idx ) => (
                <TableRow  
                    columns={columns} 
                    info={{...hours, ...data}}
                    key={idx}
                    idx={idx}
                    length={[...scheduleA, ...scheduleB, ...scheduleC].length}
                    history
                />
            )): (
                <>
                {date.getHours() >= 6 && date.getHours() < 15 ? (
                    scheduleA.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours}}
                            key={idx}
                            idx={idx}
                            length={scheduleA.length}
                        />
                    ))
                ) : date.getHours() >= 15 && date.getHours() < 23 ? (
                    scheduleB.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours}}
                            key={idx}
                            idx={idx}
                            length={scheduleB.length}
                        />
                    )) 
                ) : (
                    scheduleC.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours}}
                            key={idx}
                            idx={idx}
                            length={scheduleC.length}
                        />
                    ))
                )}
                </>
            )}
            {!hxhHistory && (
                <>
                <Row
                    padding="1vw 0"
                    borderBottom="1px solid rgb(83, 83, 83)"
                >
                    <ButtonPrimary
                        width="14vw"
                        height="3vw"
                        onClick={handleBtn}
                    >
                        Actualizar
                    </ButtonPrimary>
                    <ButtonPrimary
                        width="14vw"
                        height="3vw"
                        onClick={gotoHistory}
                    >
                        Historial de Tablero H/H
                    </ButtonPrimary>
                </Row>
                <Icons />
                </>
            )}
            
        </TableContainer>
    )
}

export default Table