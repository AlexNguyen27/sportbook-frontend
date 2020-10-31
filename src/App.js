import React, { Fragment } from 'react';
// import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

// import jwt_decode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

// COMPONENT
import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';
import RouterList from './components/layout/RouterList';
// import Footer from './components/layout/Footer';

import './css/index.css';
// import { logoutUser } from './store/actions/auth';

import { BASE_URL } from './store/actions/types';
import { globalOptions } from 'hera-js';
import HomePage from './components/pagesV2/homePage/HomePage';
globalOptions.url = BASE_URL;
// import { BASE_URL } from './store/actions/types';

// Check if token is expired
if (localStorage.token) {
  // const decoded = jwt_decode(localStorage.token.replace('Bearer ', ''));
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp <= currentTime) {
  //   store.dispatch(logoutUser());
  //   localStorage.clear();
  // }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            {/* <Navbar /> */}
            {/* <RouterList /> */}
            <HomePage/>
              {/* <Footer /> */}
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
