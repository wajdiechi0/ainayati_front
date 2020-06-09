export default function (state={},action) {
    switch (action.type) {
        case 'activities': return {...state,activities:action.payload}
        case 'heartRates': return {...state,heartRates:action.payload}
        default: return state;
    }
}