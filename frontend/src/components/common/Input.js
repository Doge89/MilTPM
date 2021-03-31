import React from 'react'

import { Container, Label, Input as InputComponent, Textarea } from '../../styles/common'

function Input({ label, value, setValue, type, id, className, width, woLabel, inputClassName, textarea, 
                disabled, onChange, flexDirection, margin, borderInput, labelSize, labelColor, labelMargin, labelWidth,
                inputSize, inputPadding, inputRadius, inputHeight, }){

    const handleInput = e => {
        if(setValue){ setValue(e.target.value) }
    }

    return(
        <Container 
            className={className}
            width={width}
            flexDirection={flexDirection}
            margin={margin}
        >
            {!woLabel && (
                <Label 
                    htmlFor={id}
                    size={labelSize}
                    color={labelColor}
                    margin={labelMargin}
                    width={labelWidth}
                >
                    {label}: 
                </Label>
            )}
            {textarea ? (
                <Textarea 
                    id={id}
                    value={value}
                    onChange={onChange || handleInput}
                    type={type || 'text'}
                    className={inputClassName}
                    disabled={disabled}
                    height={inputHeight}
                    size={inputSize}
                    padding={inputPadding}
                />
            ):(
                <InputComponent 
                    id={id}
                    value={value}
                    onChange={onChange || handleInput}
                    type={type || 'text'}
                    className={inputClassName}
                    disabled={disabled}
                    border={borderInput}
                    size={inputSize}
                    padding={inputPadding}
                    borderRadius={inputRadius}
                />
            )}
            
        </Container>
    )
}

export default Input;