export default function (state={},action) {
    switch (action.type) {
        case 'adminList': return {...state,adminList:action.payload}
        case 'doctorList': return {...state,doctorList:action.payload}
        case 'last24HoursAdmins': return {...state,last24HoursAdmins:action.payload}
        case 'last24HoursDoctors': return {...state,last24HoursDoctors:action.payload}
        case 'last24HoursPatients': return {...state,last24HoursPatients:action.payload}
        case 'last24HoursNurses': return {...state,last24HoursNurses:action.payload}
        case 'doctorListBySpecialty': return {...state,doctorListBySpecialty:action.payload}
        case 'sendAffectRequest': return {...state,sendAffectRequest:action.payload}
        case 'sendAppointmentRequest': return {...state,sendAppointmentRequest:action.payload}
        case 'fetchAffectRequests': return {...state,fetchAffectRequests:action.payload}
        case 'fetchAppointmentRequests': return {...state,fetchAppointmentRequests:action.payload}
        case 'acceptAffectRequest': return {...state,acceptAffectRequest:action.payload}
        case 'acceptAppointmentRequest': return {...state,acceptAppointmentRequest:action.payload}
        case 'denyAffectRequest': return {...state,denyAffectRequest:action.payload}
        case 'denyAppointmentRequest': return {...state,denyAppointmentRequest:action.payload}
        case 'nurseList': return {...state,nurseList:action.payload}
        case 'patientList': return {...state,patientList:action.payload}
        case 'removeUser': return {...state,removeUserResult:action.payload}
        case 'addNewUser': return {...state,addUserResult:action.payload}
        case 'getUserDetails': return {...state,addDoctorResult:action.payload}
        default: return state;
    }
}