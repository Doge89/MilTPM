import React, { useEffect, useState } from 'react'

import { PanelTableCell } from '../../../styles/tpm'
import LineEdit from './LineEdit'

import pencil from "../../../assets/img/lapiz.png"

function LineaItem({ data, idx, workers, openLineEditor,  }) {

    const openModal = () => {openLineEditor(data.linea)}


    //? ONLY IS A VERIFICATION
    useEffect(() => {
        console.info(data)
    }, [])

    return (
        <div className="table-row border-none" key={idx}>
            <PanelTableCell
                width="33.3%"
                className="border-right border-bottom border-left move-left"
            >
                <img src={pencil} alt="Editar informacion" className="img-effect" onClick={openModal}/>
                <div>
                    <span>{data.user}</span>
                </div>
            </PanelTableCell>
            <PanelTableCell
                width="33.3%"
                className="border-bottom border-right move-left email"
            >
                {data.linea}
            </PanelTableCell>
            <PanelTableCell
                width="33.3%"
                className="border-bottom border-right move-left email"
            >
                <span>{workers}</span>
            </PanelTableCell>
        </div>
    )
}

export default LineaItem