import React from "react";
import './uniformpanel.scss'
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { connect } from "react-redux";
import { IFooterPanel } from "../../../model/interface";
import { closePanel } from "../../../redux/reducers";
import { BtnType } from "../../../model/enum";
import { tooltipPlainText } from "../../../utils/utils";

interface IUniformPanelOwnProps {
  children?: React.ReactNode;
  panelTitle: string;
  renderFooter: IFooterPanel[];
}

interface IUniformPanelPropsFromDispatch {
  closePanel: any
}

type IUniformPanelProps = IUniformPanelOwnProps & IUniformPanelPropsFromDispatch;

const mapDispatchToProps = {
  closePanel
}

interface IUniformPanelState {

}

class UniformPanel extends React.Component<IUniformPanelProps, IUniformPanelState> {

  constructor(props: IUniformPanelProps) {
    super(props)


  }

  rederFooter = () => {
    const buttonCancel: IFooterPanel = {
      text: 'Hủy',
      onClick: () => this.props.closePanel(),
      type: BtnType.Default,
      disabled: false,
    };

    const buttons = [buttonCancel, ...this.props.renderFooter]

    return (
      <div className="uniform-panel-footer">
        {buttons.map((e) => {
          return (
            <>{
              e.type === BtnType.Primary ? 
              <PrimaryButton
                style={{ marginLeft: '8px'}}
                text={e.text}
                onClick={e.onClick}
                disabled={e.disabled}
              /> 
              :<DefaultButton
                style={{ marginLeft: '8px'}}
                text={e.text}
                onClick={e.onClick}
                disabled={e.disabled}
              />
            }
            </>
          )
        })}

      </div>
    )
  }




  render() {
    const { panelTitle, children } = this.props;


    return ( 
      <div className="uniform-panel-wrapper">
        <div className="uniform-panel-header">{tooltipPlainText(panelTitle) }</div>
        <div className="uniform-panel-content">{children}</div>
        {this.rederFooter()}
      </div> 
    )
  }
}

export default connect(null, mapDispatchToProps)(UniformPanel)
