export default function (state={},action) {
    switch (action.type) {
        case 'adminList': return {...state,adminList:action.payload}
        case 'doctorList': return {...state,doctorList:action.payload}
        case 'doctorListBySpecialty': return {...state,doctorListBySpecialty:action.payload}
        case 'sendAffectRequest': return {...state,sendAffectRequest:action.payload}
        case 'fetchAffectRequests': return {...state,fetchAffectRequests:action.payload}
        case 'acceptAffectRequest': return {...state,acceptAffectRequest:action.payload}
        case 'denyAffectRequest': return {...state,denyAffectRequest:action.payload}
        case 'nurseList': return {...state,nurseList:action.payload}
        case 'patientList': return {...state,patientList:action.payload}
        case 'removeUser': return {...state,removeUserResult:action.payload}
        case 'addNewUser': return {...state,addUserResult:action.payload}
        case 'getUserDetails': return {...state,addDoctorResult:action.payload}
        default: return state;
    }
}