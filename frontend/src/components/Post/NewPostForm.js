import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';




const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    


    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('userId', userData._id);
            data.append('message', message);
            if (file) data.append('file', file);
            if (video) data.append('video', video);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();

        } else {
            alert('Veuillez entrer un message ou une photo ou une vidéo');
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    }

    const cancelPost = () => {
        setMessage("");
        setPostPicture(null);
        setVideo('');
        setFile(null);
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (findLink[i].includes("https://www.youtube.com" || findLink[i].includes('https://youtube'))) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    //on traite le time watch de la video
                    setVideo(embed.split('&')[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setPostPicture('');
                }
            }
        }
        handleVideo();
    }, [userData, message, video])


    return (
        <div className='post-container'>
            {isLoading ? (
                <i className='fas fa-spinner fa-pulse'></i>
            ) : (
                <>
                    <div className='data'>
                        <p><span>{userData.following ? userData.following.length : 0}</span>
                            {" "}Abonnement{userData.following && userData.following.length > 1 ? "s" : null}</p>

                        <p><span>{userData.followers ? userData.followers.length : 0}</span>
                            {" "}Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}</p>
                    </div>
                    <NavLink exact to='/profil'>
                        <div className='user-info'>
                            <img src={userData.picture} alt='user-img' />
                        </div>
                    </NavLink>
                    <div className='post-form'>
                        <textarea
                            name='message'
                            id='message'
                            placeholder='Ecrivez votre message...'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture || video.length > 20 ? (
                            <li className='card-container'>
                                <div className='card-left'>
                                    <img src={userData.picture} alt='user-pic' />
                                </div>
                                <div className='card-right'>
                                    <div className='card-header'>
                                        <div className='pseudo'>
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className='content'>
                                        <p>{message}</p>
                                        {postPicture && <img src={postPicture} alt='post-pic' />}
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write'
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className='footer-form'>
                            <div className='icon'>
                                {isEmpty(video) && (
                                    <>
                                        <img src='./img/icons/picture.svg' alt='img' />
                                        <input type='file' id='file-upload' name='file' accept='.jpg, .jpeg, .png, .gif' onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer video</button>
                                )}
                            </div>
                            {postPicture && file.size > 500000 && (
                                <p className='error'>Veuillez choisir une image de moins de 500Ko !</p>
                            )}
                            <div className='btn-send'>
                                {message || postPicture || video.length > 20 ? (
                                    <button className="cancel" onClick={cancelPost}>Annuler message</button>
                                ) : null}
                                <button className='send' onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;