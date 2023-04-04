import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss"
import Home from "./page/Home";
import { Provider } from "react-redux";
import store from "src/redux/store";

class App extends React.Component {

    render() {
        // const id = 11;

        return (
            <Provider store={store}>
                <div className="app">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* <Route path={`/login${id}`} element={<Login />} /> */}
                        </Routes>
                    </Router>
                </div>
            </Provider>
        )
    }
}

export default App
