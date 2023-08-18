/* eslint-disable no-new */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@vant/touch-emulator';

import App from './App';

ReactDOM.createRoot(document.getElementById('app')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
