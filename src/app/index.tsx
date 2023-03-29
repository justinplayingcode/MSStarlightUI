import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss"
import Home from "./page/Home";
import Login from "./page/Login";

class App extends React.Component {

    render() {
        const id = 11;

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={`/login${id}`} element={<Login />} />
                </Routes>
            </Router>
        )
    }
}

export default App
