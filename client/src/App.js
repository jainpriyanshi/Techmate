import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Appbar/navbar"
import Homepage from "./components/Homepage/Homepage"
import Contact from "./components/Contact/Contact"
import Mentorship from './components/Mentorship/Mentorship'
function App() {
  return (
    <div>
        <Router>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/mentorship" component={Mentorship}/>
        </Router>
    </div>
  );
}

export default App;
