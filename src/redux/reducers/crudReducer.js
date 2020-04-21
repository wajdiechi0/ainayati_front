export default function (state={},action) {
    switch (action.type) {
        case 'adminList': return {...state,adminList:action.payload}
        case 'doctorList': return {...state,doctorList:action.payload}
        case 'nurseList': return {...state,nurseList:action.payload}
        case 'patientList': return {...state,patientList:action.payload}
        case 'removeUser': return {...state,removeUserResult:action.payload}
        case 'addNewDoctor': return {...state,addDoctorResult:action.payload}
        case 'getUserDetails': return {...state,addDoctorResult:action.payload}
        default: return state;
    }
}