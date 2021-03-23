import React from 'react'

import { Container, CardInfo } from '../../../styles/tpm'
import { ButtonPrimary } from '../../../styles/common'

function Ports(){
    return(
        <Container padding="2vh 10%">
            <CardInfo widthLabel="20vw">
                <label>Seleccione un puerto: </label>
                <select>
                    <option value="1">COM 1</option>
                    <option value="2">COM 2</option>
                    <option value="3">COM 3</option>
                    <option value="4">COM 4</option>
                    <option value="5">COM 5</option>
                    <option value="6">COM 6</option>
                    <option value="7">COM 7</option>
                    <option value="8">COM 8</option>
                    <option value="9">COM 9</option>
                    <option value="10">COM 10</option>
                </select>
            </CardInfo>
            <ButtonPrimary width="15vw" height="4vh">Cambiar puerto</ButtonPrimary>
        </Container>
    )
}

export default Ports