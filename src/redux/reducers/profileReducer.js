export default function (state={},action) {
    switch (action.type) {
        case 'updateProfile': return {...state,updateProfileResult:action.payload}
        default: return state;
    }
}