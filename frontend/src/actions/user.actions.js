import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPADATE_BIO = "UPADATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const getUser = (uid) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then(res => res.json())
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res
                })
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/upload`,
            data: data,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERROR, payload: res.data.errors });
                } else {
                    dispatch({ type: GET_USER_ERROR, payload: "" });
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        .then((res) => {
                            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
                        });
                }

            })
            .catch((err) => console.log(err));
    };
};

export const upadateBio = (userId, bio) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                bio: bio
            }),
        })
            .then(res => res.json())
            .then((res) => {
                dispatch({
                    type: UPADATE_BIO,
                    payload: res.bio
                })
            })
            .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: { idToFollow }
        })
            .then((res) => {
                dispatch({
                    type: FOLLOW_USER,
                    payload: { idToFollow }
                })
            })
            .catch((err) => console.log(err))
    }
}

export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        axios.defaults.withCredentials = true
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { idToUnfollow }
        })
            .then((res) => {
                dispatch({
                    type: UNFOLLOW_USER,
                    payload: { idToUnfollow }
                })
            })
            .catch((err) => console.log(err))
    }
}