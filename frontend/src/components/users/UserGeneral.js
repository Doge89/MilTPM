import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import UserHeaderTurns from './UserHeaderTurns'

import { Container } from '../../styles/common'
import { PanelTableCell, Table } from '../../styles/tpm'

import { URL } from '../../var'
import { appContext } from '../../reducers/ProviderUsers'
import StaffItem from './StaffItem'

function UserGeneral({ priv, lines, userLine }){

    const context = useContext(appContext)

    const [ keys, setKeys ] = useState([])
    const [ hours, setHours ] = useState([])
    const [ status, setStatus ] = useState([])
    const [ dataFound, setDataFound ] = useState(false)
    const [ selectedLine, setSelectedLine ] = useState('')

    const fetchAllStaff = async () => {
        const response = await axios({
            url: `${URL}/users/get/history/${userLine || selectedLine}/`,
            method: 'GET'
        })
        return response.data
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