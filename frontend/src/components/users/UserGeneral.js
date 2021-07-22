import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

import UserHeaderTurns from './UserHeaderTurns'
import StaffItem from './StaffItem'
import UserFilter from './UsersFilter'

import { Container } from '../../styles/common'
import { PanelTableCell, Table } from '../../styles/tpm'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'


function UserGeneral({ priv, lines, userLine }){

    const context = useContext(appContext)

    const [ keys, setKeys ] = useState([])
    const [ hours, setHours ] = useState([])
    const [ status, setStatus ] = useState([])
    const [ dataFound, setDataFound ] = useState(false)
    const [ selectedLine, setSelectedLine ] = useState('')

    const handleQuery = async (data) => {
        const response = await axios({
            url: `${URL}/users/filter/`,
            method: 'POST',
            data: querystring.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'X-CSRFToken' : Cookies.get('csrftoken')
            },
            withCredentials: true
        })
        return response.data
    }

    const fetchAllStaff = async () => {
        const response = await axios({
            url: `${URL}/users/get/history/${userLine || selectedLine}/`,
            method: 'GET'
        })
        return response.data
    }

    const prepareData = () => {
        return JSON.stringify({
            first: context.getFirst ? 1 : 0, last: context.getLast ? 1 : 0, orderByName: context.orderByName ? 1 : 0,
            orderByHour: context.orderByHour ? 1 : 0, orderAsc: context.orderAsc ? 1 : 0, line: userLine || selectedLine
        })
    }

    const handleLineChange = (e) => {
        e.preventDefault()
        if(e.target.value !== ""){
            setSelectedLine(e.target.value)        
        }
    }

    const handleFetchRegister = () => {
        fetchAllStaff()
        .then((data) => {
            if(data && data.length !== 0){
                setKeys(data.keys)
                setHours(data.hour)
                setStatus(data.status)
                setDataFound(true)
                console.info(data)
            }
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {
        if(selectedLine !== ""){
            handleFetchRegister()
        }
    }, [selectedLine])

    useEffect(() => {
        if(selectedLine !== "" || userLine !== ""){
            setDataFound(false)
            const data = {
                data: prepareData()
            }
            console.info(data)
            handleQuery(data)
            .then((data) => {
                if(data && data.length !== 0){
                    setKeys(data.key)
                    setHours(data.hour)
                    setStatus(data.status)
                    setDataFound(true)
                    console.info(data)
                }
            })
            .catch(error => console.error(error))
        }
    }, [context.getLast, context.getFirst, context.orderByName, context.orderAsc, context.orderByHour])

    useEffect(() => {
        if(userLine !== ""){
            handleFetchRegister()
        }
    }, [])

    return(

        <>
        <UserHeaderTurns 
            priv={priv}
            lines={lines}
            headerTitle="Resumen de registros"
            textBtn="Generar"
            onChangeSelector={handleLineChange}
            is_resume={true}
        />
        {dataFound && (
            <Container
                flexDirection='column'
                width="80%"
                alignItems="center"
                justifyContent="center"
                padding="10px"
                margin="10px 0"
            >   
                <UserFilter />
                <Table width="78%" className="table-mobile-white table-users">
                    <div className="table border-none table-users">
                        <div className="table-row border-none" id="row-uers-header">
                            <PanelTableCell width="33.3%" className="header border-right border-bottom border-top border-left move-left">Llave</PanelTableCell>
                            <PanelTableCell width="33.3%" className="header border-top border-bottom border-right move-left">Hora</PanelTableCell>
                            <PanelTableCell width="33.3%" className="header border-top border-bottom border-right move-left">Estatus</PanelTableCell>
                        </div>
                        {keys?.map((key, idx) => (
                            <StaffItem 
                                name={key}
                                idx={idx}
                                timeStamp={hours[idx]}
                                status={status[idx]}
                                is_status={true}
                                viewType="Records"
                                width="33.3%"
                            />
                        ))}
                    </div>
                </Table>
            </Container>
        )}
        </>

    )

}

export default UserGeneral