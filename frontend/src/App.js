import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//on importe nos pages
import Home from './pages/Home';
import Profil from './pages/Profil';
import Trending from './pages/Trending';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="/profil" element={ <Profil/> } />
        <Route path="/trending" element={ <Trending/>} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
};

export default App;