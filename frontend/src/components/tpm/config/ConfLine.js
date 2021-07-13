import React, { useEffect, useState } from 'react'
import axios from 'axios'

import LineaItem from './LineaItem'
import LineEdit from './LineEdit'

import { URL } from '../../../var'
import { Table, Container, PanelTableCell } from '../../../styles/tpm'

function ConfLine({ lines, users }){
    
    const [user, setUser] = useState([{}])
    const [personal, setPersonal] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [lineToEdit, setLineToEdit] = useState(null)

    const fetchData = async () => {
        const response = await axios({
            url: `${URL}/hxh/all/lines/`,
            method: 'GET'
        })

        return response.data
    }

    const openModal = (line) => {
        setLineToEdit(line)
        setModalOpen(true)
    }

    const closeModal = () => {
        setLineToEdit('')
        setModalOpen(false)

    }

    useEffect(() => {
        let i = 0
        let tmpUser = []
        console.info(lines, users)
        lines.forEach((line) => {
            users.forEach((user) => {
                if(user.linea === line){
                    const data = {
                        'user': user.username,
                        'linea': user.linea,
                    }
                    tmpUser.push(data)
                }
            })
        })
        fetchData().then((data) => {
            setPersonal(data.workers)
        })
        console.info(tmpUser)
        setUser(tmpUser)
    }, [])
    
    return (

        <Container>
            <Table width="78%" className="table-mobile-white table-users">
                <div className="table border-none table-users">
                    <div className="table-row border-none" id="row-users-header">
                        <PanelTableCell width="33.3%" className="header border-right border-bottom border-top border-left move-left">Usuario</PanelTableCell>
                        <PanelTableCell width="33.3%" className="header border-bottom border-top move-left">Linea</PanelTableCell>
                        <PanelTableCell width="33.3%" className="header border-bottom border-left border-top border-right move-left">Personal</PanelTableCell>
                    </div>
                    {user.map((user, idx) => (
                        <LineaItem 
                            data={user}
                            idx={idx}
                            workers={personal[idx]}
                            openLineEditor={openModal}
                        />
                    ))}
                </div>
            </Table>
            <LineEdit 
                isOpen={modalOpen}
                closeModal={closeModal}
                lineToEdit={lineToEdit}
            />
       </Container>

    )
}

export default ConfLine