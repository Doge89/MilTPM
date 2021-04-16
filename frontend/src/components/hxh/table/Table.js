import React, { useContext, useEffect, useState, useRef } from 'react' 
import axios from 'axios'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import TableHeadRow from './TableHeadRow'
import TableRow from './TableRow'
import Icons from './Icons'

import { TableContainer, Row } from '../../../styles/hxh'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

import { columns, scheduleA, scheduleB, scheduleC, URL, allDay, maxWidth, andonReason } from '../../../var'
import { twoDigits } from '../../../scripts'
 
function Table({ setRerender, rerender, hxhHistory, data, setGeneralInfo, setLines, setInfoUserType }){

    let timeout
    const interval = useRef()

    const date = new Date()

    const context = useContext(appContext) 

    const history = useHistory()

    const [dataFetched, setDataFetched] = useState([])
    const [rerenderChangeSchedule, setRerenderChangeSchedule] = useState(false)
    const [userType, setUserType] = useState('')

    const postData = async (data) => {
        const res = await axios({
            url: `${URL}/hxh/post/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const getData = async () => {
        const res = await axios({
            url: `${URL}/hxh/get/${context.linea}/`,
            method: 'GET'
        })

        return res.data
    }

    const fetchActualInfo =  async () => {
        const res = await axios({
            url: `${URL}/hxh/get/act/${context.linea}/`,
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

    const getLines = async () => {
        const res = await axios({
            url : `${URL}/admin/lineas/`,
            method: 'GET',
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
        
        postData(data).then(() => {
            window.location.reload()
        }).catch(e => console.log(e))
    }

    const gotoHistory = () => history.push('/hxh/historial')

    const checkHour = () => {
        const date = new Date()
        if((date.getHours() === 6 ||  date.getHours() === 13 || date.getHours() === 23) && date.getMinutes() === 0){
            setRerenderChangeSchedule(!rerenderChangeSchedule)
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

    const returnSchedule = () => {
        if(date.getHours() >= 6 && date.getHours() < 15){ return scheduleA }
        else if(date.getHours() >= 15 && date.getHours() < 23){ return scheduleB }
        else{ return scheduleC }
    }

    const getActualInfo = () => {
        interval.current = setInterval(() => {
            fetchActualInfo().then(({ actual }) => {
                const newActual = [...context.actual]
                if(newActual.length !== 0){
                    const idx = returnSchedule().findIndex(item => Number(item.start.split(':')[0]) === new Date().getHours())
                    newActual[idx] = actual?.toString()
                    context.dispatchActual({ type: 'SET', value: newActual })
                }
            }).catch(e => console.log(e))
        }, 1000);
    }

    const getAllInfo = () => {
        getData().then(({ InfProd, InfGen, Linea, Andon, lineas }) => {
            const dataInfo = JSON.parse(InfGen)
            const data = JSON.parse(InfProd).map(row => row.fields)
            const andon = JSON.parse(Andon).map(row => row.fields)
            setDataFetched(data)
            setInfoTable(data)
            console.log(dataInfo)
            setGeneralInfo({...dataInfo, linea: JSON.parse(Linea).linea})
            setAndonInfo(andon)
            if(window.innerWidth <= maxWidth){
                setTimeout(() => {
                    document.getElementById(`${twoDigits(date.getHours())}:00:00`)?.scrollIntoView({ behavior: 'smooth' })
                }, 1000);
            }
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        if(!hxhHistory){
            if(userType === "production"){ getActualInfo() }
            else{
                if(context.linea && context.linea !== ''){ getActualInfo() }
            }
        }
        return () => { window.clearInterval(interval.current) }
    }, [context.actual, userType, context.linea])

    useEffect(() => {
        if(userType === "admin" && context.linea && context.linea !== ''){
            getAllInfo()
        }
    }, [context.linea, userType])

    useEffect(() => {
        const date = new Date()
       
        if(!hxhHistory){
            checkHour()
            isLogged().then((data) =>{
                /* if(!data.Logged){ window.location.replace('/login') }
                if(data.priv === "mantenimiento"){ history.goBack() } */
                setUserType(data.priv)
                setInfoUserType(data.priv)
                if(priv === "production"){ context.dispatchLinea({ type: 'SET', value: data.Linea }) }
                getLines().then(({ lineas }) => {
                    const lines = JSON.parse(lineas).map(item => item.fields.linea)
                    setLines(lines)
                    if(data.priv === "production"){ getAllInfo() }
                }).catch(e => console.log(e))
            }).catch(e => {
                console.log(e)
            })
           
        }
        return () => { clearTimeout(timeout) }
    }, [rerenderChangeSchedule])

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
                {returnSchedule().map(( hours, idx ) => (
                    <TableRow  
                        columns={columns} 
                        info={{...hours, ...dataFetched[idx]}}
                        key={idx}
                        idx={idx}
                        length={returnSchedule().length}
                    />
                ))}
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