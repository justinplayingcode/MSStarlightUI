import { Modal, PrimaryButton, TextField } from '@fluentui/react';
import * as React from 'react'
import "./index.scss";
import { basicKeyValueRender } from 'src/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';

interface ITest{
    title: string;
    reason: string;
    detail?: File;
}

export interface ITestingProps{
  isOpen: boolean,
  onDismiss: () => void,
}

export const TestingForm = ({...props}: ITestingProps) => {
    const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
    const [fileLists, setFileList] = React.useState<File[]>([]);


    
    const handleSubmit = () => {
      // alert("submit");
      //handleOnDisMissDialog() // reset when call api send request success
      props.onDismiss();
    }

    const renderContent = () => {
      return (
        <>
          <div className="section">
            <div className="header-section">Thông tin bệnh nhân</div>
            <div className="content-section">
              {basicKeyValueRender('Họ và tên', tableSelectedItem[0]?.fullname)}
              {basicKeyValueRender('Ngày sinh', tableSelectedItem[0]?.dateOfBirth)}
              {basicKeyValueRender('Địa chỉ', tableSelectedItem[0]?.address)}
              {basicKeyValueRender('Giới tinh', Convert.convertGender(tableSelectedItem[0]?.gender))}
              {basicKeyValueRender('Bảo hiểm y tế', tableSelectedItem[0]?.insurance)}
              {basicKeyValueRender('Số điện thoại', tableSelectedItem[0]?.phonenumber)}
            </div>
          </div>
          <div className="section">
            <div className="header-section">Thông tin xét nghiệm</div>
            <div className="content-section">

            </div>
          </div>
        </>
      )
    }
    
    return(
        <Modal
          className="modal-process-container"
          isOpen={props.isOpen}
          onDismiss={props.onDismiss}
          isBlocking={true}
        >
          <div className="modal-wrapper">
            <div className="modeal-header">Xét nghiệm</div>
            <div className="modeal-content">{renderContent()}</div>
            <div className="modeal-footer">
              <PrimaryButton text="Hoàn thành" onClick={handleSubmit}/>
            </div>
          </div>
        </Modal>
    )
}