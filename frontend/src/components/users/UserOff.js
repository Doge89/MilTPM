import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'

import UserHeaderTurns from './UserHeaderTurns'
import { Container } from '../../styles/common'
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
        if(e.target.value !== ""){
            setSelectedLine(e.target.value)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(context.newKey !== "" && selectedLine !== ""){
            checkExit({data: JSON.stringify({'key':context.newKey, 'linea': selectedLine || userLine})})
            .then((data) => {
                console.log(data)
                setRenderTable(!renderTable)
            })
            .catch(error => console.error(error))
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
            .catch(error => console.error(error))
        }
    }

    useEffect(() => {
        if(selectedLine !== "")
        handleGetExits()
    }, [selectedLine, renderTable])

    useEffect(() => {
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