import React from 'react'

import { SelectorContainer, SelectorItem } from '../../styles/tpm'

function MachineSelector({ machines, setMachine, machineSelected, title }){

    const handleItem = idx => setMachine(machines[idx])

    return(
        <SelectorContainer>
            {title && <h1>Seleccione la Máquina</h1>}
            <div className="machines">
                {machines.map((machine, idx) => (
                    <SelectorItem 
                        key={idx} 
                        onClick={() => handleItem(idx)} 
                        className={machine.nombre === machineSelected?.nombre ? 'selected' : ''}
                    >
                        {machine.nombre}
                    </SelectorItem>
                ))}
            </div>
        </SelectorContainer>
    )
}

export default MachineSelector