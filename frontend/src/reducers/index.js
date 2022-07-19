import { combineReducers } from 'redux';
//on importe nos reducers
import  userReducer  from './user.reducer';
import  usersReducer  from './users.reducer';

export default combineReducers({
    userReducer,
    usersReducer
});