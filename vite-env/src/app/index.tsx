import React from "react";
import "./index.scss"
import { Provider } from "react-redux";
import UniformLayout from "./UniformLayout";
import store from "../redux/store";

const App: React.FunctionComponent = () => {
        return (
            <Provider store={store}>
                <UniformLayout/>                
            </Provider>
        )
    }

export default App
