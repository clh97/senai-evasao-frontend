import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

import Portal from './Portal';

import './css/index.css';
import './css/animate.css';

ReactDOM.render(
    <BrowserRouter>
        <Portal />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();