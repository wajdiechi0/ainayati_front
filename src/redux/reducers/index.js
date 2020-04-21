import{combineReducers} from "redux";
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import crudReducer from './crudReducer';

const rootReducers=combineReducers({
    authReducer,
    profileReducer,
    crudReducer,
});

export default rootReducers;