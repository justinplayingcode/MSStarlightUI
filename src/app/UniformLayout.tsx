import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/layout";
import { pageConstant } from "model";
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
interface UniformLayoutPropsFromState {
}

interface UniformLayoutPropsFromDispatch {
    
}

interface UniformLayoutState {
    
}

type UniformLayoutProps = UniformLayoutPropsFromState & UniformLayoutPropsFromDispatch;

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
})

const mapDispatchToProps = { };

class UniformLayout extends React.Component<UniformLayoutProps, UniformLayoutState> {
    constructor(props: UniformLayoutProps) {
        super(props);
    }


    render() {
        return (
            <div id="uniform-layout-wrapper">
                <Router>
                    <Routes>
                        {/* jump to "/" first */}
                        {/* <Route path="/" element={<Layout page={pageConstant.LAYOUT_LOGIN}/>} /> */}
                        <Route path="/" element={<Layout page={pageConstant.LAYOUT_HOME}/>} />
                        <Route path="/home" element={<Layout page={pageConstant.LAYOUT_HOME}/>} />
                        <Route path="/account" element={<Layout page={pageConstant.LAYOUT_ACCOUNT}/>} />
                        {/* <Route path={`/login${id}`} element={<Login />} /> */}
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UniformLayout)
