import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import { Card as CardComponent, CardInfo } from '../../styles/tpm'
import { ButtonPrimary, Container } from '../../styles/common'

import { URL, maxWidth } from '../../var'

function Card({ info, edit, history, updateHistory }){

    const ref = useRef(null)

    const [proposed, setProposed] = useState('')
    const [implemented, setImplemented] = useState('')

    const handleInputProposed = e => setProposed(e.target.value)
    const handleInputImplemented = e => setImplemented(e.target.value)

    const updateData = async (data) => {
        const res = await axios({
            url: `${URL}/tpm/historial/modificar/`,
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

    const handleKeyboardOpen = () => {
        if(window.innerWidth <= maxWidth){
            document.getElementById('card').style.marginBottom = '50vh'
        }
    }

    const handleKeyboardClose = () => {
        if(window.innerWidth <= maxWidth){
            document.getElementById('card').style.marginBottom = '2vh'
        }
    }

    const handleBtn = () => {
        updateData({ data: JSON.stringify({propuesta: proposed, implementada: implemented, id: info.id }) }).then(() => {
            updateHistory({...info, implementada: implemented, propuesta: proposed})
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        if(info.implementada){ setImplemented(info.implementada) }
        else{ setImplemented('') }
        if(info.propuesta){ setProposed(info.propuesta) }
        else{ setProposed('') }
    }, [info])

    return(
        <CardComponent bgColor={info?.tipo ? 'green' : 'yellow'} ref={ref} id="card">
            <div className="card">
                <h1>{info?.tipo ? 'TARJETA CONFORME' : 'TARJETA NO CONFORME'}</h1>
                <div className="content">
                    <CardInfo >
                        <span>Nombre: </span>
                        <div>{info?.usuario}</div>
                    </CardInfo>
                    <CardInfo>
                        <span>Área: </span>
                        <div>{info?.area}</div>
                    </CardInfo>
                    <CardInfo>
                        <span>Categoria: </span>
                        <div>{info?.maquina}</div>
                    </CardInfo>
                    <CardInfo>
                        <span>Localización: </span>
                        <div>{info?.localizacion}</div>
                    </CardInfo>
                    {!info.tipo && (
                        <>
                        <CardInfo column>
                            <span>Descripción del Problema: </span>
                            <div>{info?.descripcion}</div>
                        </CardInfo>
                        {(history || edit) && (
                            <>
                            <CardInfo column>
                                {edit ? (
                                    <>
                                    <label>Acción correctiva propuesta: </label>
                                    <textarea 
                                        value={proposed}
                                        onChange={handleInputProposed}
                                        onFocus={handleKeyboardOpen}
                                        onBlur={handleKeyboardClose}
                                    />
                                    </>
                                ):(
                                    <>
                                    <span>Acción correctiva propuesta: </span>
                                    <div>{info?.propuesta}</div>
                                    </>
                                )} 
                            </CardInfo>
                            <CardInfo column>
                                {edit ? (
                                    <>
                                    <label>Acción correctiva implementada: </label>
                                    <textarea 
                                        value={implemented}
                                        onChange={handleInputImplemented}
                                        onFocus={handleKeyboardOpen}
                                        onBlur={handleKeyboardClose}
                                    />
                                    </>
                                ):(
                                    <>
                                    <span>Acción correctiva implementada: </span>
                                    <div>{info?.implementada}</div>
                                    </>
                                )} 
                            </CardInfo>
                            </>
                        )}
                        </>
                    )}
                    {!info.tipo && !history && (
                        <Container
                            width="100%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ButtonPrimary width="15vw" height="4vh">Notificar</ButtonPrimary>
                        </Container>
                    )}
                    {history && edit && (
                        <Container
                            width="100%"
                            justifyContent="center" 
                            alignItems="center"
                            onClick={handleBtn}
                        >
                            <ButtonPrimary width="15vw" height="4vh">Gurdar cambios</ButtonPrimary>
                        </Container>
                    )}
                </div>
            </div>
        </CardComponent>
    )
}

export default Card