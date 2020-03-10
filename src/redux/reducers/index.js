import{combineReducers} from "redux";
import authReducer from './auth_reducer';

const rootReducers=combineReducers({
    authReducer,
});

export default rootReducers;