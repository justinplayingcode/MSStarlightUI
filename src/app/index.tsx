import React from "react";
import "./index.scss"
import { Provider } from "react-redux";
import store from "src/redux/store";
import UniformLayout from "./UniformLayout";

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <UniformLayout/>
            </Provider>
        )
    }
}

export default App
