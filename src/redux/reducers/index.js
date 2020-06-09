import{combineReducers} from "redux";
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import crudReducer from './crudReducer';
import blockchainReducer from './blockchainReducer';
import healthReducer from './healthReducer';

const rootReducers=combineReducers({
    authReducer,
    profileReducer,
    crudReducer,
    blockchainReducer,
    healthReducer
});

export default rootReducers;