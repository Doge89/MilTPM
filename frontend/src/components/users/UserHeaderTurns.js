import React from 'react'

import UserLineSelector from './UserLineSelector'

import { UserInContainer, FormUserIn } from '../../styles/users'

function UserHeaderTurns({ priv, lines, headerTitle, textBtn, onChangeSelector , onChangeInput, onClickButton }){
    return (
        <UserInContainer>
            {priv === "admin" && (
                <div>
                    <h1>Seleccione una linea</h1>
                    <UserLineSelector 
                        priv={priv}
                        lines={lines}
                        onChange={onChangeSelector}
                    />
                </div>
            )}
            <FormUserIn>
                <h1>{headerTitle}</h1>
                <form>
                    <label>Llave: </label>
                    <input 
                        type="password" 
                        onChange={onChangeInput}    
                    />
                    <button onClick={onClickButton}>{textBtn}</button>
                </form>
            </FormUserIn>
        </UserInContainer>
    )
}

export default UserHeaderTurns