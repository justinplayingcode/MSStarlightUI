import React from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { closeLoading, openLoading } from "src/redux/reducers";
import { connect } from "react-redux";
import { LoadingDot } from "../loading";

interface DefaultLayoutOwnProps {
	children: React.ReactNode;
}

interface DefaultLayoutPropsFromState {
    isLoading: boolean;
}

interface DefaultLayoutPropsFromDispatch {
    openLoading: () => void;
    closeLoading: () => void;
}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
})

const mapDispatchToProps = { openLoading, closeLoading };

type DefaultLayoutProps = DefaultLayoutOwnProps & DefaultLayoutPropsFromState & DefaultLayoutPropsFromDispatch;

class Layout extends React.Component<DefaultLayoutProps> {
    constructor(props: DefaultLayoutProps) {
		super(props);
	}

    render() {
        const { isLoading, children } = this.props;

        return (
                <div id="layout">
                    {isLoading? <LoadingDot/> : <>hello</>}
                    {children}
                </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)