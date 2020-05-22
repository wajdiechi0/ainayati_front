export default function (state={},action) {
    switch (action.type) {
        case 'blockchainHistory': return {...state,blockchainHistory:action.payload}
        case 'doctorsTx': return {...state,doctorsTx:action.payload}
        case 'appointmentList': return {...state,appointmentList:action.payload}
        case 'addAppointment': return {...state,addAppointment:action.payload}
        case 'editAppointment': return {...state,editAppointment:action.payload}
        case 'removeAppointment': return {...state,removeAppointment:action.payload}
        case 'acceptAppointmentRequest': return {...state,acceptAppointmentRequest:action.payload}
        default: return state;
    }
}