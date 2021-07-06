import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../reducers/ProviderMP';

import { FormContainer } from '../../styles/andon'
import { ButtonPrimary, ButtonSecondary, Text } from '../../styles/common'
import RadioButton from '../common/RadioButton';

import { URL } from '../../var'
import { twoDigits } from '../../scripts'

function Form({ children, location }){

    const context = useContext(appContext)

    const history = useHistory()

    const [descripction, setDescription] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    const [line, setLine] = useState('')
    const [userType, setUserType] = useState('')
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [err, setErr] = useState(false)
    const [intervalID, setIntervalID] = useState(null)
    const [andon, setAndon] = useState({})
    const [reazon, setReazon] = useState('')
    const [affectProd, setAffectProd] = useState(true)  

    const handleInputPassword = e => setPassword(e.target.value)
    const handleSelect = e => {
        if(e.target.value !== 'none'){ setLine(e.target.value) }
    }
    const handleInput = e => setDescription(e.target.value)

    const getData = async () => {
        const res = await axios({
            url: `${URL}/hxh/get/${userType=== 'production' ? '' : `${line}/`}`,
            method: 'GET'
        })

        return res.data
    }

    const fetchStartTimer = async () => {
        const res = await axios({
            url: `${URL}/andon/start/`,
            method: 'POST',
            data: querystring.stringify({ razon: type, linea: line }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const fetchPauseTimer = async () => {
        const res = await axios({
            url: `${URL}/andon/pause/`,
            method: 'POST',
            data: querystring.stringify({ razon: type, clave: password, linea: line }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })

        return res.data
    }

    const finishTimer = async (data) => {
        const res = await axios({
            url: `${URL}/andon/finish/`,
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

    const isLogged = async () => {
        const res = await axios({
            url : `${URL}/login/validate/`,
            method: 'GET',
        })

        return res.data
    }

    const handleAffectedProductionYes = () => {if(!affectProd){setAffectProd(true)}}

    const handleAffectedProductionNo = () => {if(affectProd){setAffectProd(false)}}

    const pauseTimer = (e) => {
        e.preventDefault()
        setErr(false)
        fetchPauseTimer().then(() => {
            if(timerPaused){
                setTimerPaused(false)
                localStorage.removeItem(`timerPaused${type}`) 
            }else{
                setTimerPaused(true)
                localStorage.setItem(`timerPaused${type}`, true)
            }
        }).catch(e => {
            setErr(true)
            if(e.response.status === 401){ return setMessage('La clave es incorrecta.') }
            setMessage(`No se ha podido ${timerPaused ? 'despausar' : 'pausar'} el cronometro debido a un error en el servidor.`)
        })
        
    }
    
    const removeInfoTimer = () => {
        localStorage.removeItem(`timerValue${type}`)
        localStorage.removeItem(`timerPaused${type}`)
        localStorage.removeItem(`timeBeforeExit${type}`)
        setTimerRunning(false)
        clearInterval(intervalID)
    }

    const getDateFormatted = (date) => {
        return `${date.getFullYear()}/${twoDigits(date.getMonth())}/${twoDigits(date.getDate())} ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`
    }

    const endTimer = () => {
        setErr(false)
        const dateRegistered = new Date(andon.registro)
        
        finishTimer({ clave: password, razon: type, 
            tiempo: Number(window.localStorage.getItem(`timerValue${type}`)), 
            linea: line, hrInit: new Date(andon.registro).getHours(), 
            inicio: getDateFormatted(dateRegistered),
            descrip: descripction
        }).then((data) => {
            console.log(data)
            removeInfoTimer()
            window.location.reload()
        }).catch(e => {
            setErr(true)
            if(e.response.status === 401){ return setMessage('La clave es incorrecta.') }
            setMessage(`No se ha podido ${timerPaused ? 'despausar' : 'pausar'} el cronometro debido a un error en el servidor.`)
        })
    }

    const handleFinalize = (e) => {
        e.preventDefault()
        endTimer()
    }

    const startTimer = () => {
        fetchStartTimer().then((data) => {
            console.log(data)
        }).catch(e => console.log(e))
    }

    const getTitle = () => {
        switch(type){
            case "materiales": return 'Materiales'
            case "mantenimiento": return 'Mantenimiento'
            case "produccion": return 'Producción'
            case "ingenieria": return 'Ingeniería'
            case "calidad": return 'Calidad'
            case "cambio": return 'Cambio de modelo'
        }
    }

    useEffect(() => {
        if(line !== ""){
            getData().then(({ Andon }) => {
                console.log(Andon)
                const query = new URLSearchParams(location.search)
                const andon = JSON.parse(Andon).map(row => row.fields).find(andon => andon.estatus === query.get('tipo'))

                setAndon(andon)
    
                if(andon){
                    const date = new Date(andon?.registro)
                    const periodPaused = andon.pause.split('/')
    
                    let totalTime = 0
                    let lastPausedTime = 0
    
                    if(andon.active){ totalTime = Date.now() - date.getTime() }
                
                    for(let i = 0; i < periodPaused.length; i++){
                        const period = periodPaused[i]
    
                        const startedAt = new Date(period.split('\n')[0])
                        const endAt = new Date(period.split('\n')[1])
    
                        
                        if(andon.active){
                            if(!isNaN(startedAt.getTime()) && !isNaN(endAt.getTime())){ 
                                totalTime -= endAt.getTime() - startedAt.getTime() 
                            }
                        }else{
                            if(!isNaN(startedAt.getTime())){ 
                                if(totalTime === 0){ totalTime += startedAt.getTime() - date.getTime() }
                                else{ totalTime += startedAt.getTime() - lastPausedTime }
                                lastPausedTime = endAt.getTime()
                            } 
                        }
                        
                    }
    
                    if(!andon.active){ 
                        window.localStorage.setItem(`timerPaused${andon?.estatus}`, true)
                        window.localStorage.setItem(`timerValue${andon?.estatus}`, Math.floor(totalTime /1000))
                        window.localStorage.removeItem(`timeBeforeExit${andon?.estatus}`)
                        clearInterval(intervalID) 
                        setTimerPaused(true)
                    }else{
                        window.localStorage.setItem(`timerValue${andon?.estatus}`, Math.floor(totalTime /1000))
                        window.localStorage.setItem(`timeBeforeExit${andon?.estatus}`, Date.now())
                        window.localStorage.removeItem(`timerPaused${andon?.estatus}`)
                        setTimerPaused(false)
                    }
                }else{
                    window.localStorage.removeItem(`timerPaused${type}`)
                    window.localStorage.removeItem(`timerValue${type}`)
                    window.localStorage.removeItem(`timeBeforeExit${type}`)
                    clearInterval(intervalID)
                }
    
                setRerender(!rerender)
                
            }).catch(e => console.log(e))
        }
        
    }, [intervalID, line])

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        if(!query.get('tipo')){ window.location.replace('/hxh') }
        isLogged().then((data) => {
            if(data.Logged){
                if(data.priv === 'mantenimiento'){ window.location.replace('/login') }
                if(data.priv === "production"){ setLine(data.linea) }
                else{
                    if(!query.get('linea')){ history.goBack() }
                    setLine(query.get('linea'))
                }
                setReazon(query.get('tipo'))
                setUserType(data.priv)

                if(!query.get('tipo')){ window.location.replace('/hxh') }

                setType(query.get('tipo'))

                const timerIsPaused = localStorage.getItem(`timerPaused${query.get('tipo')}`)
                const timerValue = localStorage.getItem(`timerValue${query.get('tipo')}`)
                if(timerIsPaused){ setTimerPaused(true) }
                if(timerValue){ setTimerRunning(true) }
            }else{ window.location.replace('/login') }
        }).catch(e => console.log(e))

    }, [])

    return(
        <FormContainer>
            <h1>{getTitle()}</h1>
            <form> 
                <label>Linea</label>
                <input 
                    value={line}
                    placeholder="Linea de producción"
                    disabled={true}
                />
                <label>Descripción</label>
                <textarea 
                    value={descripction}
                    onChange={handleInput}
                />
                {reazon === "mantenimiento" && (
                    <>
                        <h1>¿Afecta a producción?</h1>
                        <div style={{display: 'flex'}, {flexDirection: 'row'}}>
                            <RadioButton
                                label="Si"
                                checked={affectProd}
                                setChecked={handleAffectedProductionYes}
                            />
                            <RadioButton
                                label="No"
                                checked={!affectProd}
                                setChecked={handleAffectedProductionNo}
                            />
                        </div>
                    </>                    
                )}
                {
                    
                React.cloneElement(children, { timerPaused, timerRunning, setTimerRunning, intervalID, setIntervalID, type, startTimer, rerender })}
                {timerRunning && (
                    <>
                    <label>Ingrese una contraseña</label>
                    <input 
                        value={password}
                        onChange={handleInputPassword}
                        type="password"
                        placeholder="La clave es necesaria para finalizar el tiempo muerto"
                    />
                    <div>
                        <ButtonSecondary 
                            width="10vw" 
                            height="4vh" 
                            margin="0" 
                            onClick={pauseTimer}
                        >
                            {timerPaused ? 'Continuar' : 'Pause'}
                        </ButtonSecondary>
                        <ButtonPrimary 
                            width="10vw" 
                            height="4vh" 
                            onClick={handleFinalize}
                        >
                            Finalizar
                        </ButtonPrimary>
                    </div>
                    </>
                )}
            </form>
            {err && <Text size="1.5vw" color="rgb(254, 13, 46)">{message}</Text>}
        </FormContainer>
    )
}

export default Form