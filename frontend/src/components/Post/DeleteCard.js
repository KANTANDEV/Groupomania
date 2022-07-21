import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
const DeleteCard = (post_id) => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    
    const deleteQuote = () => dispatch(deletePost(post_id.id, uid));


    return (
        <div onClick={() => {
            if(window.confirm('Voulez-vous supprimer ce post ?')) {
                deleteQuote(); 
            }
            
               
            
        }}>
            <img src="./img/icons/trash.svg" alt="trash" />
        </div>
    );
};

export default DeleteCard;