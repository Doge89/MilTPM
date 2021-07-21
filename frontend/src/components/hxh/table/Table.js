import React, { useContext, useEffect, useState, useRef } from 'react' 
import axios from 'axios'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import TableHeadRow from './TableHeadRow'
import TableRow from './TableRow'
import Icons from './Icons'
import Resume from '../resume/Resume'

import { TableContainer, Row } from '../../../styles/hxh'
import { ButtonPrimary } from '../../../styles/common'

import { appContext } from '../../../reducers/ProviderHXH'

import { columns, scheduleA, scheduleB, scheduleC, URL, allDay, maxWidth, andonReason } from '../../../var'
import { twoDigits } from '../../../scripts'
 
function Table({ setRerender, rerender, hxhHistory, data, setGeneralInfo, setLines, setInfoUserType }){

    let timeout

    const interval = useRef()
    const intervalColor = useRef()
    const intervalStatus = useRef()
    const actStatus = useRef()
    const currentColor = useRef()

    const date = new Date()

    const context = useContext(appContext) 

    const history = useHistory()

    const [dataFetched, setDataFetched] = useState([])
    const [rerenderChangeSchedule, setRerenderChangeSchedule] = useState(false)
    const [rerenderIcons, setRerenderIcons] = useState(false)
    const [userType, setUserType] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [dataLine, setDataLine] = useState('')
    const [deadTimes, setDeadTimes] = useState([])
    const [idxAct, setIdxAct] = useState(null)

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

    const getData = async (userType) => {
        const res = await axios({
            url: `${URL}/hxh/get/${userType=== 'production' ? '' : `${context.linea}/`}`,
            method: 'GET'
        })

        return res.data
    }

    const fetchActualInfo =  async () => {
        const res = await axios({
            url: `${URL}/hxh/get/act/${userType === 'production' ? '0' : `${context.linea}`}/`,
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

    const getStatusAct = async () => {
        const response = await axios({
            url: `${URL}/hxh/get/status/${context.linea}/`,
            method: "GET"
        })

        return response.data
    }

    // const getDeadTimes = async () => {
    //     const response = await axios({
    //         url: `${URL}/hxh/get/time/${userType === 'production' ? '' : `${context.linea}`}/`,
    //         method: 'GET'
    //     })
    //     return response.data
    // }

    const prepareData = () => {
        return JSON.stringify({
            actual: context.actual.map(value => Number(value)), diferencia: context.diferencia.map(value => Number(value)), 
            codigo: context.codigo, descripcion: context.descripcion, plan: context.plan.map(value => Number(value)),
            comentario: context.comentario, tiempoMuerto: context.timeout, faltas: context.faltas, linea: context.linea, 
            incidencias: context.incidencias, mod: context.mod, entrenamiento: context.entrenamiento, bajas: context.bajas,
            consola: context.consola, contramedida: context.contramedida, job: context.job, cantidad: context.cantidad
        })
    }

    const modalResume = () => {
        isLogged().then(() => {
            setOpenModal(true)
        })
    }

    const closeModal = () => {setOpenModal(false)}

    const handleBtn = () => {
        //context.timeout.pop()
        //console.info(context.timeout)
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

    const setInfoTable = (data, deadTimes) => {

        let newPLan = []
        let newActual = []
        let newDiferencia = []
        let newCodigo = []
        let newDescripcion = []
        let newComentario = []
        let newContramedida = []
        let newCantidad = []
        let newTimeout = []
        let newWorkers = []
        let newDeadTimes = []

        for(let i = 0; i < data?.length; i++){
            newPLan[i] = data[i].plan.toString()
            newActual[i] = data[i].actual.toString()
            newDiferencia[i] = data[i].diferencia.toString()
            newDeadTimes[i] = deadTimes[i]
            newCodigo[i] = data[i].codigo
            newDescripcion[i] = data[i].descripcion
            newComentario[i] = data[i].comentarios
            newContramedida[i] = data[i].contramedida
            newCantidad[i] = data[i].cantidad
            newTimeout[i] = data[i].tiempoMuerto
            newWorkers[i] = data[i].operarios.toString()
        }
        //console.info(newDeadTimes)
        context.dispatchPlan({ type: 'SET', value: newPLan })
        context.dispatchActual({ type: 'SET', value: newActual })
        context.dispatchDiferencia({ type: 'SET', value: newDiferencia })
        context.dispatchCodigo({ type: 'SET', value: newCodigo })
        context.dispatchDescripcion({ type: 'SET', value: newDescripcion })
        context.dispatchComentario({ type: 'SET', value: newComentario })
        context.dispatchContramedida({ type: 'SET', value: newContramedida })
        context.dispatchCantidad({ type: 'SET', value: newCantidad })
        context.dispatchTimeout({ type: 'SET', value: newDeadTimes })
        context.dispatchWorker({type: "SET", value: newWorkers})
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
                    setIdxAct(idx)
                    newActual[idx] = actual?.toString()
                    context.dispatchActual({ type: 'SET', value: newActual })
                }
            }).catch(e => console.log(e))
        }, 5000);
    }

    const getAllInfo = (userType) => {
        getData(userType).then(({ InfProd, InfGen, Linea, Andon, lineas, deadTimes }) => {
            const dataInfo = JSON.parse(InfGen)
            const data = JSON.parse(InfProd).map(row => row.fields)
            const andon = JSON.parse(Andon).map(row => row.fields)
            console.info(data)
            setDataFetched(data)
            setInfoTable(data, deadTimes)
            setDeadTimes(deadTimes)
            //console.log(deadTimes)
            setGeneralInfo({...dataInfo, linea: JSON.parse(Linea).linea})
            setDataLine(JSON.parse(Linea).linea)
            setAndonInfo(andon)
            if(window.innerWidth <= maxWidth){
                setTimeout(() => {
                    document.getElementById(`${twoDigits(date.getHours())}:00:00`)?.scrollIntoView({ behavior: 'smooth' })
                }, 1000);
            }
        }).catch(e => console.log(e))
    }
 
    const setColor = (status, i) => {
        switch(status.toLowerCase()){
            case "materiales": return currentColor.current = "yellow"
            case "mantenimiento": return currentColor.current = "red"
            case "produccion": return currentColor.current = "purple"
            case "ingenieria": return currentColor.current = "cyan"
            case "calidad": return currentColor.current = "#F77000"
            case "facilities": return currentColor.current = "#0054FF"
            case "pse": return currentColor.current = "#FF0069"
            case "psi": return currentColor.current = "#CD00FF"
        }
    }

    const getColorCurrent = () => {
        //console.trace("Linea 258")
        let currentStatus = [...actStatus.current]
        currentColor.current = currentStatus.length === 0 ? "green" : ""
        for(let i = 0; i < currentStatus.length; i++){
            setColor(currentStatus[i], i)
        }
         
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
        if(!hxhHistory){
            checkHour()
            isLogged().then((data) =>{
                if(!data.Logged){ window.location.replace('/login') }
                if(data.priv === "mantenimiento"){ history.goBack() }
                setUserType(data.priv)
                setInfoUserType(data.priv)
                console.log(data.priv)
                if(data.priv === "production"){ context.dispatchLinea({ type: 'SET', value: data.Linea }) }
                else{
                    window.localStorage.clear() 
                    window.localStorage.setItem('slidePosition', 'right')
                    setRerenderIcons(!rerenderIcons)
                }
                getLines().then(({ lineas }) => {
                    const lines = JSON.parse(lineas).map(item => item.fields.linea)
                    setLines(lines)
                    if(data.priv === "production"){ getAllInfo(data.priv) }
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

    useEffect(() =>{
        if(context.linea !== undefined && context.linea !== ""){
            getStatusAct()
            .then(({ status }) => {
                let lineStatus = status.map(item => {return item})
                actStatus.current = lineStatus
            })
            .catch(error => console.error(error))     
        }
    }, [context.linea])

    useEffect(() => {
        if(actStatus.current !== undefined){
            intervalStatus.current = setInterval(() => {
                //console.info("Line 331")
                getStatusAct()
                .then(({ status }) => {
                    let lineStatus = status.map(item => {return item})
                    actStatus.current = lineStatus
                })
                .catch(error => console.error(error))
            }, 9000)
            intervalColor.current = setInterval(getColorCurrent, 1000)
        }
        return () => {clearInterval(intervalColor.current); clearInterval(intervalStatus.current)}
    }, [actStatus.current])

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
                        isActual={idx === idxAct ? true : false}
                        borderColor={currentColor.current}
                        deadTimes={deadTimes}
                        userType={userType}
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
                        width='14vw'
                        height="3vw"
                        onClick={modalResume}
                    >
                        Resumen
                    </ButtonPrimary>
                    <ButtonPrimary
                        width="14vw"
                        height="3vw"
                        onClick={gotoHistory}
                    >
                        Historial de Tablero H/H
                    </ButtonPrimary>
                </Row>
                <Icons 
                    rerender={rerender} 
                    userType={userType}
                    linea={context.linea}
                    rerenderIcons={rerenderIcons}
                />
                </>
            )}

            <Resume
                open={openModal}
                close={closeModal}
                line={context.linea}
                data={dataLine}
            >
            </Resume>
            
        </TableContainer>
    )
}

export default Table