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
    const [ getFirst, dispatchGetFirst ] = useReducer(defaultReducer, false)
    const [ getLast, dispatchGetLast ] = useReducer(defaultReducer, false)
    const [ orderByName, dispatchOrderByName ] = useReducer(defaultReducer, false)
    const [ orderByHour, dispatchOrderByHour ] = useReducer(defaultReducer, false)
    const [ orderAsc, dispatchOrderAsc ] = useReducer(defaultReducer, false)

    return(
        <appContext.Provider
            value={{key, totalStaff, staff, turn, name, register, newKey, newName,
            getFirst, orderByName, orderByHour, orderAsc, getLast ,dispatchGetFirst, dispatchOrderByName,
            dispatchOrderByHour, dispatchName, dispatchNewKey, dispatchNewName, dispatchRegister, dispatchStaff,
            dispatchTotalStaff, dispatchTurn, dispatchKey, dispatchOrderAsc, dispatchGetLast}}
        >
            {children}
        </appContext.Provider>
    )

}

export default ProviderUsers