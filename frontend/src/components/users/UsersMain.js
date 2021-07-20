import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import UserIn from './UserIn'
import UsersOption from './UsersOption'
import UserRegister from './UserRegister'
import UsersOff from './UserOff'

import { appContext } from '../../reducers/ProviderUsers'
import { URL } from '../../var'
import { UserContainer } from '../../styles/users'
import UserGeneral from './UserGeneral'

function UsersMain(){

    const context = useContext(appContext)

    const [ viewType, setViewType ] = useState('')
    const [ priv, setPriv ] = useState('')
    const [ lines, setLines ] = useState([])
    const [ userLine, setUserLine ] = useState('')
    const [ keys, setKeys ] = useState([])

    const valLogin = async () => {
        const response = await axios({
            url: `${URL}/login/validate/`,
            method: 'GET'
        })
        return response.data
    }

    const getAllLines = async () => {
        const response = await axios({
            url: `${URL}/hxh/all/lines/`,
            method: "GET"
        })
        return response.data
    }

    const fetchStaff = async () => {
        const response = await axios({
            url: `${URL}/users/get/`,
            method: "GET"
        })
        return response.data
    }


    useEffect(() => {
        valLogin()
        .then((data) => {
            if(data.Logged){
                setPriv(data.priv)
                if(data.priv == "production"){setUserLine(data.linea)}
                
                getAllLines()
                .then(({ lineas }) => {
                    setLines(lineas)

                    fetchStaff()
                    .then(({ key }) => {
                        context.dispatchKey({type: "SET", value: key})
                    })
                    .catch(error => console.error(error))

                }).catch(error => console.error(error))

            }else{
                window.location.replace('/login/')
            }
        }).catch(error => console.error(error))
        
    }, [])

    return (
        <UserContainer>
            <UsersOption 
                setViewType={setViewType}
            />
            {viewType === "Registro" ? (
                <UserRegister 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}
                    userKeys={context.key}
                />
            ) : viewType === "Entrada" ? (
                <UserIn 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}
                    keys={keys}

                />
            ) : viewType === "Salida" ? (
                <UsersOff 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}
                />
            ) : viewType === "Resumen" ? (
                <UserGeneral 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}
                />
            ) : (
                <>
                </>
            )}
        </UserContainer>

    )
}

export default UsersMain