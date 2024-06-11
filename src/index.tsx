import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App.tsx';
import { AppContext } from './context/AppContext.jsx'
import { Container } from 'react-bootstrap';
import Chatroom from './pages/chatroom/Chatroom.tsx';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Container id='test' fluid style={{ backgroundColor: '#F5F5F5' }}>
    <React.StrictMode>
      <AppContext>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chatroom" element={<Chatroom />} />
          </Routes>
        </Router>
      </AppContext>
    </React.StrictMode>
  </Container>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
