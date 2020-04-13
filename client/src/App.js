import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./view/NavBar/";
//import Routes from './Routes/Routes';
import Register from './view/register/';
import confirmation from './view/confirmation/';
import forgot from "./view/forgot/";
import forgot1 from "./view/forgot/forgot1";
import newPassword from "./view/forgot/newPassword";
import Login from "./view/login/";
import home from "./view/home/";
import home1 from "./view/home1/"
import Annonce from "./view/annonce";
import { NotFoundRoute } from 'react-router';
import {Route,  BrowserRouter } from 'react-router-dom';
import Demande from "./view/demande";
import Footer from "./view/footer/";
import MesAnnonce from "./view/mesAnnonce/";
import Axios from 'axios';

//const  createBrowserHistory = require("history/createBrowserHistory")
//const history = createBrowserHistory()
//{user === null ? EmailConfirmCont : HomeContainer} 

function App() {
  return (
 
      <div className="App" >
          <BrowserRouter><NavBar />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirmation" component={confirmation}/>
            <Route exact path="/forgot" component={forgot}/>
            <Route exact path="/verif" component={forgot1}/>
            <Route exact path="/newPassword" component={newPassword}/>
            <Route exact path="/" component={ home}/>
            <Route exact path="/annonce" component={Annonce} />
            <Route exact path="/home1" component={home1} />
            <Route exact path="/demande" component={Demande} />
            <Route exact path="/mesAnnonce" component={MesAnnonce} />
            <Footer />
            </BrowserRouter>
      </div>
   
    
  );
}

export default App;