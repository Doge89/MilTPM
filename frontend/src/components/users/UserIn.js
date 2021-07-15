import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'

//import { UserInContainer, FormUserIn } from '../../styles/users'
import UserHeaderTurns from './UserHeaderTurns'
import { Container } from '../../styles/common'
import { PanelTableCell, Table } from '../../styles/tpm'
import StaffItem from './StaffItem'

function UserIn({ priv, lines, userLine }){

    const context = useContext(appContext)

    const [ selectedLine, setSelectedLine ] = useState('')
    const [ dataFound, setDataFound ] = useState(false)
    const [ renderTable, setRenderTable ] = useState(false)
    const [ names, setNames ] = useState([])
    const [ dates, setDates ] = useState([])
    const [ times, setTimes ] = useState([])
    
    const getUsersIn = async () => {
        const response = await axios({
            url: `${URL}/users/getIn/${selectedLine || userLine}/`,
            method: "GET"
        })

        return response.data
    }

    const checkEntrance = async (data) => {
        const response = await axios({
            url: `${URL}/users/getIn/`,
            method: "POST",
            data: querystring.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            withCredentials: true
        })
        
        return response.data
    }

    const handleChangeKey = e => context.dispatchNewKey({type: "SET", value: e.target.value})

    const handleLineSwitch = (e) => {
        if(e.target.value !== ""){
            setSelectedLine(e.target.value)
        }
    }

    const handleUsersIn = () => {
        getUsersIn()
        .then((data) => {
            console.info(data)
            setNames(data.name)
            setDates(data.date)
            setTimes(data.time)
            setDataFound(true)
        }).catch((error) => console.error(error))
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(context.newKey !== "" ){
            checkEntrance({data: JSON.stringify({'key': context.newKey, 'linea': userLine || selectedLine})})
            .then((data) =>{
                console.info("ENTRADA")
                console.info(data)
                setRenderTable(!renderTable)
            })
            .catch((error) => console.error(error))
        }else{
            console.error("EMPTY DATA")
        }
    }

    useEffect(() => {
        if(selectedLine !== ""){
            console.log(selectedLine)
            handleUsersIn()
        }
    }, [selectedLine, renderTable])

    useEffect(() => {
        if(userLine !== "" ){
            handleUsersIn()
        }
    }, [])

    return (
        <>
        <UserHeaderTurns 
            priv={priv}
            lines={lines}
            headerTitle="Entrada"
            textBtn="Entrar"
            onChangeSelector={handleLineSwitch}
            onChangeInput={handleChangeKey}
            onClickButton={handleClick}
        />
        {dataFound && (
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
                            <PanelTableCell width="50%" className="header border-right border-bottom border-top border-left move-left">Usuario</PanelTableCell>
                            <PanelTableCell width="50%" className="border-bottom border-right border-top move-left">Hora</PanelTableCell>
                        </div>
                        {names.map((name, idx) => (
                            <StaffItem 
                                name={name}
                                idx={idx}
                                date={dates[idx]}
                                hour={times[idx]}
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

export default UserIn