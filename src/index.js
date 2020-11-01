import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/fontawesome-all.css';
import './css/swiper.css';
import './css/magnific-popup.css';
import './css/styles.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './css/index.css';

import { ThroughProvider } from 'react-through';

ReactDOM.render(
  <ThroughProvider>
    <App />
  </ThroughProvider>,
  document.getElementById('root')
);
