import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPADATE_BIO = "UPADATE_BIO";

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
      return axios ({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/upload`,
        data: data,
        withCredentials: true,
      })
        .then((res) => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              });
          
        })
        .catch((err) => console.log(err));
    };
  };

// export const uploadPicture = (data, id) => {
//     return (dispatch) => {
//         return fetch(`${process.env.REACT_APP_API_URL}api/user/upload/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//                     body: JSON.stringify({
//                         file: data.picture
//                     }),
//         })
//             .then(res => res.json())
//             .then((res) => {
//                 console.log(res)
//                 fetch(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
//                     method: 'GET',
//                 })
//                     .then(res => res.json())
//                     .then((res) => {
//                         dispatch({
//                             type: UPLOAD_PICTURE,
//                             payload: res.data.picture
//                         })
//                     })
//             })
//             .catch((err) => console.log(err))
//     }
// }

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
                console.log(res.bio)
                dispatch({
                    type: UPADATE_BIO,
                    payload: res.bio
                })
            })
            .catch((err) => console.log(err))
    }
}
