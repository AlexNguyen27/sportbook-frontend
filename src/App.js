import React, { Fragment } from 'react';
// import { connect } from 'react-redux'
// import Helmet from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

// COMPONENT
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RouterList from './components/layout/RouterList';

import './css/index.css';

import { BASE_URL } from './store/actions/types';
import { globalOptions } from 'hera-js';
import { logoutUser } from './store/actions/auth';
globalOptions.url = BASE_URL;
// import { BASE_URL } from './store/actions/types';

// Check if token is expired
if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  const currentTime = Date.now() / 1000;
  if (decoded.iat <= currentTime) {
    store.dispatch(logoutUser());
    localStorage.clear();
  }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <div className="content" style={{ position: 'relative', minHeight: '64vh' }}>
              {/* <Navbar /> */}
              <RouterList />
            </div>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
