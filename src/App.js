import React from "react";
import Contact from "./components/Contact";
import "./app.css";
import AI from "./components/AI"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  return  (
    <Router>
        <Routes>
            <Route path="/" element = {<Contact />} />
            <Route path="/AI" element = {<AI />} />
        </Routes>
    </Router>
  );
}

export default App;
