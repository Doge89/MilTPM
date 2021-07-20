import React, { useReducer } from 'react'

import { defaultReducer } from './reducers'

export const appContext = React.createContext() 

function Provider({ children }){

    const [ plan, dispatchPlan ] = useReducer(defaultReducer, [])
    const [ actual, dispatchActual ] = useReducer(defaultReducer, [])
    const [ diferencia, dispatchDiferencia ] = useReducer(defaultReducer, [])
    const [ codigo, dispatchCodigo ] = useReducer(defaultReducer, [])
    const [ descripcion, dispatchDescripcion ] = useReducer(defaultReducer, [])
    const [ comentario, dispatchComentario ] = useReducer(defaultReducer, [])
    const [ contramedida, dispatchContramedida ] = useReducer(defaultReducer, [])
    const [ timeout, dispatchTimeout ] = useReducer(defaultReducer, [])
    const [ cantidad, dispatchCantidad ] = useReducer(defaultReducer, [])
    const [ faltas, dispatchFaltas ] = useReducer(defaultReducer, '')
    const [ linea, dispatchLinea ] = useReducer(defaultReducer, '')
    const [ incidencias, dispatchIncidencias ] = useReducer(defaultReducer, '')
    const [ consola, dispatchConsola ] = useReducer(defaultReducer, '')
    const [ bajas, dispatchBajas ] = useReducer(defaultReducer, '')
    const [ job, dispatchJob ] = useReducer(defaultReducer, '')
    const [ entrenamiento, dispatchEntrenamiento ] = useReducer(defaultReducer, '')
    const [ mod, dispatchMod ] = useReducer(defaultReducer, '')
    const [ worker, dispatchWorker ] = useReducer(defaultReducer, [])

    return(
        <appContext.Provider
            value={{
                plan, faltas, linea, incidencias,timeout, cantidad,
                consola, bajas, job, entrenamiento, mod, actual,
                diferencia, codigo, descripcion, comentario, worker,
                dispatchPlan, dispatchFaltas, dispatchLinea, contramedida,
                dispatchIncidencias, dispatchConsola, dispatchBajas, dispatchTimeout,
                dispatchJob, dispatchEntrenamiento, dispatchMod, dispatchActual, dispatchCantidad,
                dispatchDiferencia, dispatchCodigo, dispatchDescripcion, dispatchComentario, dispatchContramedida,
                dispatchWorker
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider