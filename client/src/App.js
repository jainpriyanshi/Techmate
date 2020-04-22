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
import ProjectForm from "./components/Project/Projectform"
import Projectlist from "./components/Project/Projectlist"
import EditProject from "./components/Project/Edit"
import Footer from "./components/Appbar/footer"
import Forum from "./components/Forum/Forum"
import Post from "./components/Forum/Post"
import AddPost from "./components/Forum/AddPost/AddPost"
import EditPost from "./components/Forum/AddPost/EditPost"
import Help from "./components/Homepage/help"

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
            <Route exact path="/profile/:id" component={ProfileMe} />
            <Route exact path="/profile/me/update" component={ProfileForm} />
            <Route exact path="/propose" component={ProjectForm} />
            <Route exact path="/project" component={Projectlist} />
            <Route exact path="/project/edit/:id" component={EditProject} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/forum/show/:id" component={Post} />
            <Route exact path="/forum/post" component={AddPost}/>
            <Route exact path="/forum/editpost/:id" component={EditPost}/>
            <Route exact path="/help" component={Help}/>
          
        </Router>
    </div>
    </Provider>
  );
}

export default App;
