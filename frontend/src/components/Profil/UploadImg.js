import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch(null);
    const userData = useSelector((state) => state.userReducer);


    const handlePicture = (e) => {

        e.preventDefault();
        const data = new FormData();
        data.append('name', userData.pseudo);
        data.append('userId', userData._id);
        data.append('file', file);

        dispatch(uploadPicture(data, userData._id));
    }



    return (
        <form action='' onSubmit={handlePicture} className='upload-pic'>
            <label htmlFor='file'>Changer votre photo de profil</label>
            <input type='file' id='file' name='file' accept='.jpg, .jpeg, .png, .gif' onChange={(e) => setFile(e.target.files[0])} />

            <br />
            <input type='submit' value='Envoyer' />
            {file && !file.name.match(/\.(jpg|jpeg|png|gif)$/) ? (
                <p className='error'>Veuillez choisir une image valide</p>
            ) : null}

            {file && file.size > 500000 && (
                <p className='error'>Veuillez choisir une image de moins de 500Ko !</p>
            )}
        </form>
    )
}


//     );
// };

export default UploadImg;