


export const GET_USER = "GET_USER";

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

