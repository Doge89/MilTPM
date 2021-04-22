import React, { useReducer } from 'react'

import { defaultReducer } from './reducers'

export const appContext = React.createContext()

function Provider({ children }){

    const [ status, dispatchStatus ] = useReducer(defaultReducer, [])

    return(
        <appContext.Provider
            value={{
                status, dispatchStatus
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider