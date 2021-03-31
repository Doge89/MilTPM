import React, { useReducer } from 'react'

import { defaultReducer } from './reducers'

export const appContext = React.createContext()

function Provider({ children }){

    const [ type, dispatchType ] = useReducer(defaultReducer, '')
    const [ line, dispatchLine ] = useReducer(defaultReducer, '')
    const [ technicianChief, dispatchTechnicianChief ] = useReducer(defaultReducer, '')
    const [ superMTTO, dispatchSuperMTTO ] = useReducer(defaultReducer, '')
    const [ superPRDN, dispatchSuperPRDN ] = useReducer(defaultReducer, '')
    const [ reportedBy, dispatchReportedBy ] = useReducer(defaultReducer, '')
    const [ machineType, dispatchMachineType ] = useReducer(defaultReducer, '')
    const [ machineTag, dispatchMachineTag ] = useReducer(defaultReducer, '')
    const [ description, dispatchDescription ] = useReducer(defaultReducer, '')
    const [ failType, dispatchFailType ] = useReducer(defaultReducer, '')
    const [ productionAffected, dispatchProductionAffected ] = useReducer(defaultReducer, false)
    const [ technician, dispatchTechnician ] = useReducer(defaultReducer, '')
    const [ startedAt, dispatchStartedAt ] = useReducer(defaultReducer, '')
    const [ endAt, dispatchEndAt ] = useReducer(defaultReducer, '')
    const [ fixedBy, dispatchFixedBy ] = useReducer(defaultReducer, '')
    const [ partsUsed, dispatchPartsUsed ] = useReducer(defaultReducer, '')
    const [ causedBy, dispatchCausedBy ] = useReducer(defaultReducer, '')
    const [ timeout, dispatchTimeout ] = useReducer(defaultReducer, '')
    const [ validatedBy, dispatchValidatedBy ] = useReducer(defaultReducer, '')
    const [ turno, dispatchTurno ] = useReducer(defaultReducer, 'A')

    return(
        <appContext.Provider
            value={{
                failType, line, technician, superMTTO, superPRDN, reportedBy, machineType, machineTag, description,
                type, productionAffected, technicianChief, startedAt, endAt, fixedBy,
                partsUsed, causedBy, timeout,validatedBy ,turno,
                dispatchLine, dispatchTechnician, dispatchSuperMTTO, dispatchDescription,
                dispatchSuperPRDN, dispatchReportedBy, dispatchMachineType, dispatchMachineTag, dispatchType,
                dispatchFailType, dispatchProductionAffected, dispatchTechnicianChief,
                dispatchStartedAt, dispatchEndAt, dispatchFixedBy, dispatchPartsUsed, dispatchCausedBy,
                dispatchTimeout, dispatchValidatedBy, dispatchTurno
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider