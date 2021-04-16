import React, { useContext } from 'react'

import RadioButton from '../../common/RadioButton'

import { TableRow } from '../../../styles/mp'

import { appContext } from '../../../reducers/ProviderMP'

function TableBody({ history, machines }){

    const context = useContext(appContext)
    
    const handleInputReportedBy = e => context.dispatchReportedBy({ type: 'SET', value: e.target.value })
    const handleInputMachineTag = e => context.dispatchMachineTag({ type: 'SET', value: e.target.value })
    const handleInputDescription = e => context.dispatchDescription({ type: 'SET', value: e.target.value })
    const handleInputTechnician = e => context.dispatchTechnician({ type: 'SET', value: e.target.value })
    const handleInputStartedAt = e => context.dispatchStartedAt({ type: 'SET', value: e.target.value })
    const handleInputEndAt = e => context.dispatchEndAt({ type: 'SET', value: e.target.value })
    const handleInputFixedBy = e => context.dispatchFixedBy({ type: 'SET', value: e.target.value })
    const handleInputPartsUsed = e => context.dispatchPartsUsed({ type: 'SET', value: e.target.value })
    const handleInputCausedBy = e => {
        if(e.target.none !== "none"){ context.dispatchCausedBy({ type: 'SET', value: e.target.value }) }
    }
    const handleInputTimeout = e => context.dispatchTimeout({ type: 'SET', value: e.target.value })
    const handleInputValidatedBy = e => context.dispatchValidatedBy({ type: 'SET', value: e.target.value })
    
    const handleSelectFailType = e => {
        if(e.target.value !== "none"){ context.dispatchFailType({ type: 'SET', value: e.target.value }) }
    }
    const handleSelectMachineType = e => {
        if(e.target.value !== "none"){ context.dispatchMachineType({ type: 'SET', value: e.target.value }) }
    }

    const handleButtonAffectedProductionYes = () => {
        if(!history){ context.dispatchProductionAffected({ type: 'SET', value: true }) }
    }
    const handleButtonAffectedProductionNo = () => {
        if(!history){ context.dispatchProductionAffected({ type: 'SET', value: false }) }
    }

    return(
        <>
            <TableRow className="first-child">
                <div className="label">
                    <span>Reportado por</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.reportedBy}
                        onChange={handleInputReportedBy}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Tipo de máquina</span>
                </div>
                <div className="input-container">
                    <select value={context.machineType} onChange={handleSelectMachineType} disabled={history}>
                        <option value="none">Selecciona máquina</option>
                        {machines.map((machine, idx) => (
                            <option key={idx}>{machine.nombre}</option>
                        ))}
                    </select>
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Tag de la máquina</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.machineTag}
                        onChange={handleInputMachineTag}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Descripción de la falla</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.description}
                        onChange={handleInputDescription}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Tipo de falla</span>
                </div>
                <div className="input-container">
                    <select value={context.failType} onChange={handleSelectFailType} disabled={history}>
                        <option value="none">Selecciona falla</option>
                        <option>Eléctrica</option>
                        <option>Electrónica</option>
                        <option>Neumática</option>
                        <option>Hidráulica</option>
                        <option>Mecánica</option>
                        <option>Operaciones</option>
                    </select>
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>¿Afecta a producción?</span>
                </div>
                <div className="input-container">
                   <RadioButton 
                        checked={context.productionAffected}
                        label="Si"
                        setChecked={handleButtonAffectedProductionYes}
                   />
                   <RadioButton 
                        checked={!context.productionAffected}
                        label="No"
                        setChecked={handleButtonAffectedProductionNo}
                   />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Técnico</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.technician}
                        onChange={handleInputTechnician}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Inicio de reparación</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.startedAt}
                        onChange={handleInputStartedAt}
                        type="time"
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Fin de reparación</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.endAt}
                        onChange={handleInputEndAt}
                        type="time"
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Reparación realizada</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.fixedBy}
                        onChange={handleInputFixedBy}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Refacciones usadas</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.partsUsed}
                        onChange={handleInputPartsUsed}
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Causa probable</span>
                </div>
                <div className="input-container">
                    <select value={context.causedBy} onChange={handleInputCausedBy} disabled={history}>
                        <option value="none">Selecciona causa</option>
                        <option>Mala calibración</option>
                        <option>Mal ajuste</option>
                        <option>Desajuste</option>
                        <option>Mala Operación</option>
                        <option>Falla de equipo</option>
                        <option>Otras</option>
                    </select>
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Tiempo muerto total</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.timeout}
                        onChange={handleInputTimeout}
                        type="time"
                        disabled={history}
                    />
                </div>
            </TableRow>
            <TableRow>
                <div className="label">
                    <span>Validado por</span>
                </div>
                <div className="input-container">
                    <input 
                        value={context.validatedBy}
                        onChange={handleInputValidatedBy}
                        disabled={history}
                    />
                </div>
            </TableRow>
        </>
    )
}

export default TableBody