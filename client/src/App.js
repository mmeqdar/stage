import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./view/NavBar/";
import Routes from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';
//const  createBrowserHistory = require("history/createBrowserHistory")
//const history = createBrowserHistory()


function App() {
  return (
 
      <div className="App">
          <BrowserRouter><NavBar /></BrowserRouter>   
            <Routes />
      </div>
   
    
  );
}

export default App;