import { UidContext } from '../components/AppContext';
import React, { useContext} from 'react';
import LeftNav from '../components/LeftNav';
import Thread from '../components/Thread';
import NewPostForm from '../components/Post/NewPostForm';
import Log from '../components/Log';
import Trends from '../components/Trends';
import FriendsHint from '../components/Profil/FriendsHint';



const Home = () => {
    const uid = useContext(UidContext);


    return (
        <div className='home'>
            <LeftNav />
            <div className='main'>
                <div className='home-header'>
                    {uid ? <NewPostForm/> : <Log login={true} signup={false}/>}
                </div>
                <Thread />
            </div>
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                        <Trends />
                        {uid && <FriendsHint />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;