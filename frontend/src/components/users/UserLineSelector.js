import React from 'react'

function UserLineSelector({ priv, lines, onChange }){

    return(
        <select
            style={{padding: "10px", border: "1px solid black", fontSize: "20px", borderRadius: "8px"}}
            disabled={priv !== "admin" ? true : false}
            onChange={onChange}
        >
            <option value="">Seleccione una linea</option>
            {lines.map((line, idx) => (
                <option value={line} key={idx}>{line}</option>
            ))}
        </select>
    )

}

export default UserLineSelector