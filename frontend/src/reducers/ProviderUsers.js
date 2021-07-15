import React, { useReducer } from 'react'

import { defaultReducer } from './reducers'

export const appContext = React.createContext()

function ProviderUsers({ children }){

    const [ key, dispatchKey ] = useReducer(defaultReducer, [])
    const [ totalStaff, dispatchTotalStaff ] = useReducer(defaultReducer, 0)
    const [ staff, dispatchStaff ] = useReducer(defaultReducer, [])
    const [ turn, dispatchTurn ] = useReducer('')
    const [ name, dispatchName ] = useReducer('')
    const [ register, dispatchRegister ] = useReducer([])
    const [ newKey, dispatchNewKey ] = useReducer(defaultReducer, "")
    const [ newName, dispatchNewName ] = useReducer(defaultReducer, "")

    return(
        <appContext.Provider
            value={{key, totalStaff, staff, turn, name, register, newKey, newName,
            dispatchName, dispatchNewKey, dispatchNewName, dispatchRegister, dispatchStaff,
            dispatchTotalStaff, dispatchTurn, dispatchKey}}
        >
            {children}
        </appContext.Provider>
    )

}

export default ProviderUsers