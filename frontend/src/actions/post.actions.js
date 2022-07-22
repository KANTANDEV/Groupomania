import axios from 'axios';


//posts
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

//comments
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENTS = 'EDIT_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';





//POSTS
export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then(res => {
                const array = res.data.slice(0, num);
                dispatch({
                    type: GET_POSTS,
                    payload: array
                })
            })
            .catch(err => console.log(err));
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            data: data ,
            WithCreditentials: true,
        })
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
            data: { id: userId },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({
                    type: LIKE_POST,
                    payload: { postId, userId }
                })
            })
            .catch(err => console.log(err));
    }
}

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
            data: { id: userId },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({
                    type: UNLIKE_POST,
                    payload: { postId, userId }
                })
            })
            .catch(err => console.log(err));
    }
}

export const updatePost = (postId, message, uid) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message : message, id: uid },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({ type: UPDATE_POST, payload: { message, postId } })
            })
            .catch(err => console.log(err));
    }
}

export const deletePost = (postId, uid ) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}` ,
            data: { id: uid },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({ type: DELETE_POST, payload: { postId } })
               
            })
            .catch(err => console.log(err));
    }
}

//COMMENTS
export const addComment = (postId, commenterId, text,commenterPseudo, uid) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo, id: uid },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({ type: ADD_COMMENTS, payload: { postId } })
            })
            .catch(err => console.log(err));
    }
}

export const editComment = (postId, commentId, text, uid) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data: { commentId, text, id :  uid  },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({ type: EDIT_COMMENTS, payload: { postId, commentId, text } })
            })
            .catch(err => console.log(err));
    }
}

export const deleteComment = (postId, commentId, uid, commenterId) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data: { commentId, id :  uid , commenterId },
            WithCreditentials: true,
        })
            .then(res => {
                dispatch({ type: DELETE_COMMENTS, payload: { postId, commentId } })
            })
            .catch(err => console.log(err));
    }
}