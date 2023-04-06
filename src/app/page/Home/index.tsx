import React from "react";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "src/redux/reducers";
import { RootState } from "src/redux/store";

interface HomePropsFromState {

}

interface HomePropsFromDispatch {
    openLoading: () => void;
    closeLoading: () => void;
}

interface HomeState {
    item: any[];
}

type HomeProps = HomePropsFromState & HomePropsFromDispatch;

const mapStateToProps = (state: RootState) => ({

})

const mapDispatchToProps = { openLoading, closeLoading };

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            item: []
        }
    }

    componentDidMount() {
        const { openLoading, closeLoading } = this.props;
        openLoading();
        setTimeout(this.fetchaasa, 5000)
    }

    fetchaasa = () => {
        const { closeLoading } = this.props;
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(result => {
                this.setState({item: result});
            }).catch(() => {}).finally(() => { closeLoading() })
    }

    render() {

        return (
            <div>
                {this.state.item.map(e => {
                    return (
                        <div>{e.name}</div>
                    )
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)