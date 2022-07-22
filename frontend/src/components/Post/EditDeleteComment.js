import { UidContext } from '../AppContext';
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';

const EditDeleteComment = ({ comment, postId }) => {
    const uid = useContext(UidContext);
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(postId, comment._id, text, uid))
            setText("");
            setEdit(false);
        }
    }

    const handleDelete = (e) => dispatch(deleteComment(postId, comment._id, uid, comment.commenterId));


    useEffect(() => {
        const checkAuthor = () => {
            if ((uid === comment.commenterId || userData.admin === true)) {
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId, userData.admin])

    return (
        <div className='edit-comment'>
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src='./img/icons/edit.svg' alt='edit-comment' />
                </span>
            )}
            {isAuthor && edit === true && (
                <form onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor='text' onClick={() => setEdit(!edit)}>Annuler les modifications</label>
                    <br />
                    <input type='text' name='text' onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <br />
                    <div className='btn'>
                        <span onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
                                handleDelete();
                            }
                        }}>
                            <img src='./img/icons/trash.svg' alt='delete-comment' />
                        </span>
                        <input type='submit' value='Valider les modifications' />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;