import React from 'react';
import './App.css';
import {Router} from'@reach/router';
import {Login,Register,Reset,ResetLink} from './views/authentication/index'
function App() {
  return (
    <Router>
      <Login path='/login'/>
      <Register path='/register'/>
      <Reset path='/resetpassword'/>
      <ResetLink path='/password/reset/:token'/>
    </Router>
  );
}

export default App;
