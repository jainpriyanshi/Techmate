import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Appbar/navbar"
import Homepage from "./components/Homepage/Homepage"
import Contact from "./components/Contact/Contact"

import Profile from "./components/Profilepage/profile"
function App() {
  return (
    <div>
        <Router>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/profile" component={Profile} />
        </Router>
    </div>
  );
}

export default App;
