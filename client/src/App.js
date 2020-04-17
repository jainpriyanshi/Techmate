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
import Register from "./components/Auth/Register"
import Verify from "./components/Auth/Verify";
import Generate from "./components/Auth/generate";
import Changepass from "./components/Auth/changepass";
import Login from "./components/Auth/Login";
import ProfileMe from "./components/Profilepage/profile"
import ProfileForm from "./components/Profilepage/profileform"


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
            <Route exact path="/generate" component={Generate} /> 
            <Route exact path="/update" component={Changepass} />
            <Route exact path="/profile/me" component={ProfileMe} />
            <Route exact path="/profile/update" component={ProfileForm} />
        </Router>
    </div>
    </Provider>
  );
}

export default App;
