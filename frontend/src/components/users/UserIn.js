import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import querystring from 'querystring'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'

//import { UserInContainer, FormUserIn } from '../../styles/users'
import UserHeaderTurns from './UserHeaderTurns'
import { Container, Text } from '../../styles/common'
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
    const [ errorFound, setErrorFound ] = useState(false)
    const [ errMessage, setErrorMessage ] = useState('')

    const [ workersIn, setWorkersIn ] = useState(0)
    
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
        setErrorFound(false)
        if(e.target.value !== ""){
            setSelectedLine(e.target.value)
        }else{
            setErrorFound(true)
            setDataFound(false)
            setErrorMessage("Espere, la linea no puede ser vacia")
        }
    }

    const handleUsersIn = () => {
        setErrorFound(false)
        getUsersIn()
        .then((data) => {
            console.info(data)
            setNames(data.name)
            setDates(data.date)
            setTimes(data.time)
            setWorkersIn(data.workers)
            setDataFound(true)
        }).catch((error) => {
            setErrorFound(true)
            setDataFound(false)
            setErrorMessage("No se pudo obtener la información debido a un error del servidor")
            console.error(error)
        })
    }

    const handleClick = (e) => {
        setErrorFound(false)
        e.preventDefault()
        if(context.newKey !== "" || selectedLine !== ""){
            checkEntrance({data: JSON.stringify({'key': context.newKey, 'linea': userLine || selectedLine})})
            .then((data) =>{
                console.info("ENTRADA")
                console.info(data)
                setRenderTable(!renderTable)
            })
            .catch((error) => console.error(error))
        }else{
            setErrorFound(true)
            setDataFound(false)
            setErrorMessage("El servidor no puede crear el registro sin una llave, intente añadiendo algo")
            console.error("EMPTY DATA")
        }
    }

    useEffect(() => {
        if(selectedLine !== "" || userLine !== ""){
            console.log(selectedLine)
            handleUsersIn()
        }else{
            setErrorFound(true)
            setDataFound(false)
            setErrorMessage("La linea no puede ser Vacia, seleccione una linea")
        }
    }, [selectedLine, renderTable])

    useEffect(() => {
        setErrorFound(false)
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
        {errorFound && (
            <Text
                margin="15px 0 "
                size="25px"
                color="red"
                weight="bold"
                align="center"
                transform="uppercase"
            >
                {errMessage}
            </Text>
        )}
        {dataFound && (
            <Container 
                flexDirection="column"
                width="80%"
                alignItems="center"
                justifyContent="center"
                padding="10px"
                margin="10px 0"
            >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'row wrap'}}>
                    <h1 style={{textTransform: 'uppercase', color: 'rgb(254, 13, 43)', marginRight: '15px'}}>No. Trabajadores Actuales</h1>
                    <span style={{fontSize: '18px'}}>{workersIn}</span>
                </div>
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

export default UserIn