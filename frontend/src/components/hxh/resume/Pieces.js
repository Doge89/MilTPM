import React, { useState, useEffect } from 'react'
import { ResumeRowContainer } from '../../../styles/hxh'


function Pieces( { noPieces, title } ){

    //VARIABLES

    return (

        <div
            className="numberPieces"
        >
            <h1>{title}</h1>
            <span>{noPieces}</span>

        </div>

    )

}

export default Pieces