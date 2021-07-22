import React, { useContext, useEffect, useState } from 'react'

import { appContext } from '../../reducers/ProviderUsers'

import { QuerySearchColumn } from '../../styles/users'

import QueryColumnRow from './QueryColumnRow'

function QueryColumn({ title, idx }){
    
    const context = useContext(appContext)

    const handleGetFirst = (e) => context.dispatchGetFirst({ type: "SET", value: context.getLast ? false : context.getFirst ? false : true })
    const handleGetLast = (e) => context.dispatchGetLast({ type: "SET", value: context.getFirst ? false : context.getLast ?  false: true })

    const handleOrderName = e => context.dispatchOrderByName({ type: "SET", value: !context.orderByName })
    const handleOrderByHour = e => context.dispatchOrderByHour({ type: "SET", value: !context.orderByHour })

    const handleOrderAsc = e => context.dispatchOrderAsc({ type: "SET", value: true })
    const handleOrderDesc = e => context.dispatchOrderAsc({ type: "SET", value: false })

    return(
        <QuerySearchColumn>
            <h2 className="header">{title}</h2>
            <div className="query-form">
            {title === "Obtener el: " ? (
               <>
                <QueryColumnRow 
                    subtitles="Primero"
                    handleOneOptionRadio={handleGetFirst}
                    value={context.getFirst}
                />
                <QueryColumnRow 
                    handleOneOptionRadio={handleGetLast}
                    subtitles="Último"
                    value={context.getLast}
                />
               </>
            ) : title === "Ordenar por: " ? (
                <>
                <QueryColumnRow 
                    subtitles="Nombre"
                    handleOneOptionRadio={handleOrderName}
                    value={context.orderByName}
                />
                <QueryColumnRow 
                    handleOneOptionRadio={handleOrderByHour}
                    subtitles="Hora"
                    value={context.orderByHour}
                />
               </>
            ) : (
                <>
                <QueryColumnRow 
                    subtitles="Ascendente"
                    handleOneOptionRadio={handleOrderAsc}
                    value={context.orderAsc}
                />
                <QueryColumnRow 
                    handleOneOptionRadio={handleOrderDesc}
                    subtitles="Descendente"
                    value={!context.orderAsc}
                />
                </>
            )}
            </div>
        </QuerySearchColumn>
    )
}

export default QueryColumn