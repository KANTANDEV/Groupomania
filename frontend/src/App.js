import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UidContext } from './components/AppContext';
import { useDispatch} from 'react-redux';
//on importe nos pages
import Home from './pages/Home';
import Profil from './pages/Profil';
import Trending from './pages/Trending';
import Navbar from './components/Navbar';
import { getUser } from './actions/user.actions';


const App = () => {
  const [uid, setUid] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {

      await fetch(`${process.env.REACT_APP_API_URL}api/user/isConnected`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })

        .then(res => res.json())
        .then((res) => {
          setUid(res)
        })
        .catch(err => console.log(err));
    }
    fetchData();

    if (uid) dispatch(getUser(uid))
        
  }, [uid, dispatch]);




  return (
    <Router>
      <Navbar />
      <UidContext.Provider value={uid}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UidContext.Provider>
    </Router>
  );
};

export default App;