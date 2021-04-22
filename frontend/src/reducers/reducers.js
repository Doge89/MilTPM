export const defaultReducer = (state, action) => {
    switch(action.type){
        case 'SET': return action.value
        default: return state
    }
}