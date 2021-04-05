import React, { useContext, useEffect, useState } from 'react' 
import axios from 'axios'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom'

import TableHeadRow from './TableHeadRow'
import TableRow from './TableRow'
import Icons from './Icons'

import { TableContainer, Row } from '../../../styles/hxh'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

import { columns, scheduleA, scheduleB, scheduleC, URL, allDay, maxWidth } from '../../../var'
 
function Table({ setRerender, rerender, hxhHistory, data, setGeneralInfo }){

    let timeout

    const date = new Date()

    const context = useContext(appContext) 

    const history = useHistory()

    const [dataFetched, setDataFetched] = useState([])

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/hxh/post/`,
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
            url: `${URL}/hxh/get/`,
            method: 'GET'
        })

        console.log(res.data)
        return res.data
    }

    const prepareData = () => {
        return JSON.stringify({
            actual: context.actual.map(value => Number(value)), diferencia: context.diferencia.map(value => Number(value)), 
            codigo: context.codigo, descripcion: context.descripcion, plan: context.plan.map(value => Number(value)),
            comentario: context.comentario,tiempoMuerto: context.timeout, faltas: context.faltas, linea: context.linea, 
            incidencias: context.incidencias, mod: context.mod, entrenamiento: context.entrenamiento, bajas: context.bajas,
            consola: context.consola, contramedida: context.contramedida, job: context.job, cantidad: context.cantidad
        })
    }

    const handleBtn = () => {
        const data = {
            data: prepareData()
        }
        console.log(data)
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

    const setInfoTable = (data) => {

        let newPLan = []
        let newActual = []
        let newDiferencia = []
        let newCodigo = []
        let newDescripcion = []
        let newComentario = []
        let newContramedida = []
        let newCantidad = []
        let newTimeout = []

        for(let i = 0; i < data?.length; i++){
            newPLan[i] = data[i].plan.toString()
            newActual[i] = data[i].actual.toString()
            newDiferencia[i] = data[i].diferencia.toString()
            newCodigo[i] = data[i].codigo
            newDescripcion[i] = data[i].descripcion
            newComentario[i] = data[i].comentarios
            newContramedida[i] = data[i].contramedida
            newCantidad[i] = data[i].cantidad
            newTimeout[i] = data[i].tiempoMuerto
        }

        context.dispatchPlan({ type: 'SET', value: newPLan })
        context.dispatchActual({ type: 'SET', value: newActual })
        context.dispatchDiferencia({ type: 'SET', value: newDiferencia })
        context.dispatchCodigo({ type: 'SET', value: newCodigo })
        context.dispatchDescripcion({ type: 'SET', value: newDescripcion })
        context.dispatchComentario({ type: 'SET', value: newComentario })
        context.dispatchContramedida({ type: 'SET', value: newContramedida })
        context.dispatchCantidad({ type: 'SET', value: newCantidad })
        context.dispatchTimeout({ type: 'SET', value: newTimeout })
    }

    const twoDigits = number => number < 10 ? `0${number}` : number

    const clearLocalStorage = () => {
        window.localStorage.removeItem('timerValuemantenimiento')
        window.localStorage.removeItem('timerValuemateriales')
        window.localStorage.removeItem('timerValueproduccion')
        window.localStorage.removeItem('timerValueingenieria')
        window.localStorage.removeItem('timerValuecalidad')
        window.localStorage.removeItem('timerValuecambio')
        window.localStorage.removeItem('timeBeforeExitmantenimiento')
        window.localStorage.removeItem('timeBeforeExitmateriales')
        window.localStorage.removeItem('timeBeforeExitproduccion')
        window.localStorage.removeItem('timeBeforeExitingenieria')
        window.localStorage.removeItem('timeBeforeExitcalidad')
        window.localStorage.removeItem('timeBeforeExitcambio')
    }

    const setAndonInfo = (andon) => {
        if(andon.length === 0){ clearLocalStorage() }
        for(let i = 0; i < andon.length; i++){
            const date = new Date(andon[i].registro)
            window.localStorage.setItem(`timerValue${andon[i].estatus}`, Math.floor((Date.now() - date.getTime()) /1000))
            window.localStorage.setItem(`timeBeforeExit${andon[i].estatus}`, Date.now())
        }
        setRerender(!rerender)
    }

    useEffect(() => {
        const date = new Date()
        if(window.innerWidth <= maxWidth){
            document.getElementById(`${twoDigits(date.getHours())}:00:00`)?.scrollIntoView({ behavior: 'smooth' })
        }
        if(!hxhHistory){
            checkHour()
            getData().then(({ InfProd, InfGen, Linea, Andon }) => {
                const dataInfo = JSON.parse(InfGen)
                const data = JSON.parse(InfProd).map(row => row.fields)
                const andon = JSON.parse(Andon).map(row => row.fields)
                console.log(andon)
                setDataFetched(data)
                setInfoTable(data)
                setGeneralInfo({...dataInfo, linea: JSON.parse(Linea).linea})
                setAndonInfo(andon)
            }).catch(e => console.log(e))
        }
        return () => { clearTimeout(timeout) }
    }, [])

    useEffect(() => {
        if(hxhHistory){ setInfoTable(data) }
    }, [data])

    return(
        <TableContainer>
            <TableHeadRow columns={columns} />
            {hxhHistory ? allDay?.map(( hours, idx ) => data && (
                <TableRow  
                    columns={columns} 
                    info={{...hours, ...data[idx]}} 
                    key={idx}
                    idx={idx}
                    length={allDay.length}
                    history
                />
            )): (
                <>
                {date.getHours() >= 6 && date.getHours() < 15 ? (
                    scheduleA.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours, ...dataFetched[idx]}}
                            key={idx}
                            idx={idx}
                            length={scheduleA.length}
                        />
                    ))
                ) : date.getHours() >= 15 && date.getHours() < 23 ? (
                    scheduleB.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours, ...dataFetched[idx]}}
                            key={idx}
                            idx={idx}
                            length={scheduleB.length}
                        />
                    )) 
                ) : (
                    scheduleC.map(( hours, idx ) => (
                        <TableRow  
                            columns={columns} 
                            info={{...hours, ...dataFetched[idx]}}
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
                <Icons rerender={rerender}/>
                </>
            )}
            
        </TableContainer>
    )
}

export default Table