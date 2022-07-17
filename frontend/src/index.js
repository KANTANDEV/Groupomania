import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//Devtool
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);


