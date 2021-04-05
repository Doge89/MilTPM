import React, { useState, useEffect } from 'react';
import axios from 'axios'
import querystring from 'querystring'

import { FormContainer } from '../../styles/andon'
import { ButtonPrimary, ButtonSecondary } from '../../styles/common'

import { URL } from '../../var'

function Form({ children, location }){

    const [descripction, setDescription] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)
    const [intervalID, setIntervalID] = useState(null)

    const handleInputPassword = e => setPassword(e.target.value)

    const handleInput = e => setDescription(e.target.value)

    const getData = async () => {
        const res = await axios({
            url: `${URL}/hxh/get/`,
            method: 'GET'
        })

        return res.data
    }

    const fetchStartTimer = async () => {
        const res = await axios({
            url: `${URL}/andon/start/`,
            method: 'POST',
            data: querystring.stringify({ razon: type })
        })

        return res.data
    }

    const fetchPauseTimer = async () => {
        const res = await axios({
            url: `${URL}/andon/pause/`,
            method: 'POST',
            data: querystring.stringify({ razon: type })
        })

        return res.data
    }

    const finishTimer = async (data) => {
        const res = await axios({
            url: `${URL}/andon/finish/`,
            method: 'POST',
            data: querystring.stringify(data)
        })

        return res.data
    }

    const pauseTimer = (e) => {
        e.preventDefault()
        fetchPauseTimer().then(() => {
            if(timerPaused){
                setTimerPaused(false)
                localStorage.removeItem(`timerPaused${type}`) 
            }else{
                setTimerPaused(true)
                localStorage.setItem(`timerPaused${type}`, true)
            }
        }).catch(e => console.log(e))
        
    }
    
    const removeInfoTimer = () => {
        localStorage.removeItem(`timerValue${type}`)
        localStorage.removeItem(`timerPaused${type}`)
        localStorage.removeItem(`timeBeforeExit${type}`)
        setTimerRunning(false)
        clearInterval(intervalID)
    }

    const endTimer = () => {
        finishTimer({ clave: password, razon: type, tiempo: Number(window.localStorage.getItem(`timerValue${type}`)) }).then((data) => {
            console.log(data)
            removeInfoTimer()
            window.location.reload()
        }).catch(e => {
            console.log(e)
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

    useEffect(() => {
        console.log(intervalID)
        getData().then(({ Andon }) => {
            const query = new URLSearchParams(location.search)
            const andon = JSON.parse(Andon).map(row => row.fields).find(andon => andon.estatus === query.get('tipo'))

            console.log(andon)

            if(andon){
                const date = new Date(andon?.registro)
                const datePaused = new Date(andon?.pause)

                if(!andon.active){ 
                    window.localStorage.setItem(`timerPaused${andon?.estatus}`, true)
                    window.localStorage.setItem(`timerValue${andon?.estatus}`, Math.floor((datePaused.getTime() - date.getTime()) /1000))
                    window.localStorage.removeItem(`timeBeforeExit${andon?.estatus}`) 
                }else{
                    window.localStorage.setItem(`timerValue${andon?.estatus}`, Math.floor((Date.now() - date.getTime()) /1000))
                    window.localStorage.setItem(`timeBeforeExit${andon?.estatus}`, Date.now())
                    window.localStorage.removeItem(`timerPaused${andon?.estatus}`)
                }
            }else{
                window.localStorage.removeItem(`timerPaused${type}`)
                window.localStorage.removeItem(`timerValue${type}`)
                window.localStorage.removeItem(`timeBeforeExit${type}`)
                clearInterval(intervalID)
            }
            
        }).catch(e => console.log(e))
    }, [intervalID])

    useEffect(() => {

        const query = new URLSearchParams(location.search)
        setType(query.get('tipo'))

        const timerIsPaused = localStorage.getItem(`timerPaused${query.get('tipo')}`)
        const timerValue = localStorage.getItem(`timerValue${query.get('tipo')}`)
        if(timerIsPaused){ setTimerPaused(true) }
        if(timerValue){ setTimerRunning(true) }

    }, [])

    return(
        <FormContainer>
            <h1>Si necesitas materiales, elabore su solicitud</h1>
            <form> 
                <label>Descripción</label>
                <textarea 
                    value={descripction}
                    onChange={handleInput}
                />
                {React.cloneElement(children, { timerPaused, timerRunning, setTimerRunning, intervalID, setIntervalID, type, startTimer })}
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
        </FormContainer>
    )
}

export default Form