import React, { useReducer } from 'react'

import { defaultReducer } from './reducers'

export const appContext = React.createContext()

function ProviderUsers({ children }){

    const [ key, dipatchKey ] = useReducer(defaultReducer, [])
    const [ totalStaff, dispatchTotalStaff ] = useReducer(defaultReducer, 0)
    const [ staff, dispatchStaff ] = useReducer(defaultReducer, [])
    const [ turn, dispatchTurn ] = useReducer('')
    const [ name, dispatchName ] = useReducer('')
    const [ register, dispatch ] = useReducer([])

    return(
        <appContext.Provider
            value={key, totalStaff, staff, turn, name, register}
        >
            {children}
        </appContext.Provider>
    )

}

export default ProviderUsers