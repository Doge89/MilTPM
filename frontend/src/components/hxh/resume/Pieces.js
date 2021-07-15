import React from 'react'

function Pieces( { noPieces, title, staff, staffResume } ){

    //VARIABLES
    return (

        <div
            className="numberPieces"
        >
            <h1>{title}</h1>
            <span>{staffResume ? staff : noPieces}</span>
        </div>

    )

}

export default Pieces