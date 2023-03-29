import React from "react";
import { Common } from "utils";

class Home extends React.Component {

    render() {
        return (
            <div>
                {Common.convertShortenString("Home", 2)}
            </div>
        )
    }
}

export default Home