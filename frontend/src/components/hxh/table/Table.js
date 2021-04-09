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

import { columns, scheduleA, scheduleB, scheduleC, URL, allDay, maxWidth, andonReason } from '../../../var'
import { twoDigits } from '../../../scripts'
 
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

        return res.data
    }

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

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

    const setAndonInfo = (andonDB) => {
        for(let i = 0; i < andonReason.length; i++){
            const andon = andonDB.find(item => item.estatus === andonReason[i])

            if(andon){
                const date = new Date(andon.registro)
                const datePaused = new Date(andon.pause)

                if(!andon.active){ 
                    window.localStorage.setItem(`timerPaused${andon.estatus}`, true)
                    window.localStorage.setItem(`timerValue${andon.estatus}`, Math.floor((datePaused.getTime() - date.getTime()) /1000))
                    window.localStorage.removeItem(`timeBeforeExit${andon.estatus}`) 
                }else{
                    window.localStorage.setItem(`timerValue${andon.estatus}`, Math.floor((Date.now() - date.getTime()) /1000))
                    window.localStorage.setItem(`timeBeforeExit${andon.estatus}`, Date.now())
                    window.localStorage.removeItem(`timerPaused${andon.estatus}`)
                }
            }else{
                window.localStorage.removeItem(`timerPaused${andonReason[i]}`)
                window.localStorage.removeItem(`timerValue${andonReason[i]}`)
                window.localStorage.removeItem(`timeBeforeExit${andonReason[i]}`)
            }
            
        }
        setRerender(!rerender)
    }

    useEffect(() => {
        const date = new Date()
       
        if(!hxhHistory){
            checkHour()
            isLogged().then((data) =>{
                if(!data.Logged){ window.location.replace('/login') }
                getData().then(({ InfProd, InfGen, Linea, Andon }) => {
                    const dataInfo = JSON.parse(InfGen)
                    const data = JSON.parse(InfProd).map(row => row.fields)
                    const andon = JSON.parse(Andon).map(row => row.fields)
                    setDataFetched(data)
                    setInfoTable(data)
                    setGeneralInfo({...dataInfo, linea: JSON.parse(Linea).linea})
                    setAndonInfo(andon)
                    if(window.innerWidth <= maxWidth){
                        setTimeout(() => {
                            document.getElementById(`${twoDigits(date.getHours())}:00:00`)?.scrollIntoView({ behavior: 'smooth' })
                        }, 1000);
                    }
                }).catch(e => console.log(e))
            }).catch(e => {
                console.log(e)
            })
           
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