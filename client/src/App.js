import React from 'react';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Appbar/navbar"
import Homepage from "./components/Homepage/Homepage"
import Contact from "./components/Contact/Contact"
import Register from "./components/auth/Register"
import Verify from "./components/auth/Verify";
import Generate from "./components/auth/generate";
import Changepass from "./components/auth/changepass";
import Login from "./components/auth/Login";

if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
    <div>
        <Router>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />            
            <Route exact path="/verify" component={Verify} /> 
            <Route exact path="/Generate" component={Generate} /> 
            <Route exact path="/update" component={Changepass} />
        </Router>
    </div>
    </Provider>
  );
}

export default App;
