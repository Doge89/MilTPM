import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import querystring from "querystring"
import Cookies from 'js-cookie'

import { Container, Text, ButtonPrimary } from '../../styles/common'
import { PanelTableCell, Table } from '../../styles/tpm'
import { AddUserForm } from '../../styles/users'
import { URL } from '../../var'

import { appContext } from "../../reducers/ProviderUsers"

import StaffItem from './StaffItem'


function UserRegister({ priv, lines, userLine, userKeys }){

    const context = useContext(appContext)

    const [ dataFounded, setDataFounded ] = useState(false)
    const [ errMessage, setErrMessage ] = useState("")
    const [ keys, setKeys ] = useState([])
    const [ names, setNames ] = useState([])
    const [ renderTable, setRenderTable ] = useState(false)

    const fetchStaff = async () => {
        const response = await axios({
            url: `${URL}/users/get/`,
            method: "GET"
        })
        if(response.status === 204){
            return {"message" : "No se encontraron usuarios en el servidor"}
        }
        return response.data
    }

    const createUser = async (data) => {
        console.info(data)
        const response = await axios({
            url: `${URL}/users/create/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken" : Cookies.get('csrftoken'),
            },
            withCredentials: true
            
        })

        return response.data
    }

    const handleChangeKey = e => context.dispatchNewKey({type: "SET", value: e.target.value})

    const handleChangeName = e => context.dispatchNewName({type: "SET", value: e.target.value})

    const getStaff = () => {
        fetchStaff()
        .then((data) => {
            if("message" in data){
                return setErrMessage(data.message)
            }
            setDataFounded(true)
            setKeys(data.key)
            setNames(data.name)
        }).catch(error => console.error(error))
    }

    const getData = () => {
        return JSON.stringify({
            key: context.newKey, name: context.newName
        })
    }

    const prepareData = (e) =>{
        e.preventDefault()
        createUser({data: getData()})
        .then((data) => {
            setRenderTable(!renderTable)
            console.log(data)
        }).catch(error => console.error(error))
    }

    useEffect(() => {
        //console.log(lines)
        getStaff()
    }, [renderTable])

    useEffect(() => {
        console.info(userKeys)
        if(userKeys.length !== 0){
            getStaff()
        }
    }, [])

    return(

        <>
        {errMessage !== "" &&(
            <Text
                color="red"
                weight="bold"
                align="center" 
                transform="uppercase"
                size="30px"
                margin="15px 0"
            >
                {errMessage}
            </Text>
        )}
        <div
            style={{display: 'flex', width: "100%", justifyContent: "center", alignItems: "center", flexFlow: "row wrap"}}
        >
            <AddUserForm>
                <div>
                    <label>Llave: </label>
                    <input 
                        type="text"
                        onChange={handleChangeKey}
                    />
                </div>
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text"
                        onChange={handleChangeName}
                    />
                </div>
                <ButtonPrimary
                    width="200px"
                    height="40px"
                    onClick={prepareData}
                >
                    Crear Usuario
                </ButtonPrimary>
            </AddUserForm>
        </div>
        {dataFounded && (
            <Container
                flexDirection="row"
                width="80%"
                alignItems="center"
                justifyContent="center"
                padding="10px"
                margin="10px 0"
            >
                <Table width="78%" className="table-mobile-white table-users">
                    <div className="table border-none table-users">
                        <div className="table-row border-none" id="row-users-header">
                            <PanelTableCell width="50%" className="header border-right border-bottom border-top border-left move-left">Llave</PanelTableCell>
                            <PanelTableCell width="50%" className="header border-bottom border-right border-top move-left">Nombre</PanelTableCell>
                        </div>
                        {/* {console.info(userKeys)} */}
                        {context.key?.map((key, idx) => (
                            <StaffItem
                                key={key !== undefined ? key : key[idx]}
                                name={names[idx]}
                                idx={idx}
                                viewType="Register"
                                width="50%"
                            />
                        ))}
                    </div>
                </Table>
            </Container>
        )}
        </>
    )

}

export default UserRegister