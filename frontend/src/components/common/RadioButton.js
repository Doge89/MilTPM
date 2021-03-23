import React from 'react'

import { RadioButtonContainer } from '../../styles/common'

function RadioButton({ label, color, checked, setChecked, width }){

    const handleButton = () => setChecked(!checked)
        
    return(
        <RadioButtonContainer color={color} checked={checked} width={width}>
            <div className="radio-button" onClick={handleButton}>
                <div></div>
            </div>
            <span>{label}</span>
        </RadioButtonContainer>
    )
}

export default RadioButton