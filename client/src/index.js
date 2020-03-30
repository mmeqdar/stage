import React , { Suspense }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';
var localStorage = require('localStorage')
if(!localStorage.getItem('langue'))
    localStorage.setItem('langue', 'en');
    console.log("hahiiiiaaa : " +localStorage.getItem('i18nextLng'))
ReactDOM.render(<Suspense fallback={(<div>Loading.........</div>)}><App /></Suspense>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";

const store = configureStore();
const persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter>
                <App  store={store}/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();*/
