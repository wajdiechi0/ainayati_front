export default function (state={},action) {
    switch (action.type) {
        case 'resetPassword': return {...state,resetResult:action.payload}
        case 'sendReset': return {...state,resetSendResult:action.payload}
        case 'login': return {...state,loginResult:action.payload}
        case 'register': return {...state,registerResult:action.payload}
        default: return state;
    }
}