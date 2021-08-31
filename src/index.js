import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter } from 'react-router-dom';

const routing = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);
