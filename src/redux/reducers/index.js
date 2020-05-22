import{combineReducers} from "redux";
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import crudReducer from './crudReducer';
import blockchainReducer from './blockchainReducer';

const rootReducers=combineReducers({
    authReducer,
    profileReducer,
    crudReducer,
    blockchainReducer
});

export default rootReducers;