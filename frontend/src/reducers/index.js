import { combineReducers } from 'redux';
//on importe nos reducers
import  userReducer  from './user.reducer';
import  usersReducer  from './users.reducer';
import postReducer from './post.reducer';
import allPostsReducer from './allPosts.reducer';
import trendingReducer from './trending.reducer';



export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    allPostsReducer,
    trendingReducer,
});