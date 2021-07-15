import React, { useEffect, useState } from 'react'
import axios from 'axios'

import UserIn from './UserIn'
import UsersOption from './UsersOption'
import UserRegister from './UserRegister'
import UsersOff from './UserOff'

import { URL } from '../../var'
import { UserContainer } from '../../styles/users'

function UsersMain(){

    const [ viewType, setViewType ] = useState('Registro')
    const [ priv, setPriv ] = useState('')
    const [ lines, setLines ] = useState([])
    const [ userLine, setUserLine ] = useState('')

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

    useEffect(() => {
        valLogin()
        .then((data) => {
            if(data.Logged){
                setPriv(data.priv)
                if(data.priv == "production"){setUserLine(data.linea)}
                getAllLines()
                .then(({ lineas }) => {
                    setLines(lineas)
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
                />
            ) : viewType === "Entrada" ? (
                <UserIn 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}

                />
            ): (
                <UsersOff 
                    priv={priv}
                    lines={lines}
                    userLine={priv === "admin" ? "" : userLine}
                />
            )}
        </UserContainer>

    )
}

export default UsersMain