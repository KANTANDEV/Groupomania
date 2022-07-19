import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//Devtool
// import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
   reducer: rootReducer,
   middleware: [thunk, logger]

})

root.render(
    <Provider store={store}>
    <App />
    </Provider>
);


