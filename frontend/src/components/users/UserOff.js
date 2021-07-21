import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'

import UserHeaderTurns from './UserHeaderTurns'
import { Container, Text } from '../../styles/common'
import { PanelTableCell, Table } from '../../styles/tpm'
import StaffItem from './StaffItem'

function UsersOff({ priv, lines, userLine }){  

    const context = useContext(appContext)

    const [ selectedLine, setSelectedLine ] = useState('')
    const [ dataFounded, setDataFound ] = useState(false)
    const [ renderTable, setRenderTable ] = useState(false)
    const [ names, setNames ] = useState([])
    const [ dates, setDates ] = useState([])
    const [ times, setTimes ] = useState([])
    const [ errMessage, setErrorMessage ] = useState('')
    const [ errorFound, setErrorFound ] = useState(false)

    const getExists = async () => {
        const response = await axios({
            url: `${URL}/users/exits/${selectedLine || userLine}/`,
            method: "GET"
        })

        return response.data
    }

    const checkExit = async (data) => {
        const response = await axios({
            url: `${URL}/users/exits/`,
            method: "POST",
            data: querystring.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": Cookies.get("csrftoken")
            }, 
            withCredentials: true
        })
        return response.data
    }

    const handleKeyChange = e => context.dispatchNewKey({type: "SET", value: e.target.value})

    const handleSelectorChange = (e) => {
        setErrorFound(false)
        if(e.target.value !== ""){
            setSelectedLine(e.target.value)
        }else{
            setErrorFound(true)
            setDataFound(false)
            setErrorMessage("Espere, la linea no puede ser vacia")
        }
    }

    const handleClick = (e) => {
        setErrorFound(false)
        e.preventDefault()
        if(context.newKey !== "" || selectedLine !== ""){
            checkExit({data: JSON.stringify({'key':context.newKey, 'linea': selectedLine || userLine})})
            .then((data) => {
                console.log(data)
                setRenderTable(!renderTable)
            })
            .catch(error => {
                console.error(error)
                setErrorFound(true)
                setDataFound(false)
                setErrorMessage("El servidor no puede crea el registro sin una llave, intente añadiendo una")
            })
        }
    }

    const handleGetExits = () => {
        if(selectedLine !== "" || userLine !== ""){
            getExists()
            .then(({ name, date, time }) => {
                console.info(name, date, time)
                setDates(date)
                setNames(name)
                setTimes(time)
                setDataFound(true)
            })
            .catch(error => {
                setDataFound(false)
                setErrorFound(true)
                setErrorMessage("La linea no puede ser Vacia, seleccione una linea")
                console.error(error)
            })
        }
    }

    useEffect(() => {
        setErrorFound(false)
        if(selectedLine !== "" || userLine !== "")
        handleGetExits()
    }, [selectedLine, renderTable])

    useEffect(() => {
        setErrorFound(false)
        if(userLine !== ""){
            handleGetExits()
        }
    }, [])

    return (
        <>
            <UserHeaderTurns 
                priv={priv}
                lines={lines}
                headerTitle="Salida"
                textBtn="Salir"
                onChangeSelector={handleSelectorChange}
                onChangeInput={handleKeyChange}
                onClickButton={handleClick}
            />
            {errorFound && (
                <Text
                    margin="15px 0"
                    size="25px"
                    color="red"
                    weight="bold"
                    align="center"
                    transform="uppercase"
                >
                    {errMessage}
                </Text>
            )}
            {dataFounded && (
                <Container
                    flexDirection = "row"
                    width = "80%"
                    alignItems="center"
                    justifyContent="center"
                    padding="10px"
                    margin="10px 0"
                >
                    <Table width="78%" className="table-mobile-white table-users">
                        <div className="table border-none table-users">
                            <div className="table-row border-none" id="row-users-header">
                                <PanelTableCell width="50%" className="header border-bottom border-right border-top border-top border-left move-left">Usuario</PanelTableCell>
                                <PanelTableCell width="50%" className="border-bottom border-right border-top move-left">Hora</PanelTableCell>
                            </div> {}
                            {names.map((u, i) =>(
                                <StaffItem 
                                    name={u}
                                    idx={i}
                                    date={dates[i]}
                                    hour={times[i]}
                                    viewType="Records"
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

export default UsersOff