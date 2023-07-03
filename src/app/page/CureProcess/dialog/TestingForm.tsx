import { Label, Modal, PrimaryButton, TextField } from '@fluentui/react';
import * as React from 'react'
import "./index.scss";
import { basicKeyValueRender } from 'src/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';
import { useEffect, useState } from 'react';
import { TestList } from 'src/model/doctorModel';

interface ITest{
  service: string;
  reason: string;
  detailFile: File;
  errorMessage: string;
}

export interface ITestingProps{
  isOpen: boolean,
  onDismiss: () => void,
}

export const TestingForm = ({...props}: ITestingProps) => {
    const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
    const [tests, setTests] = React.useState<ITest[]>([]);

    useEffect(() => {
      // call api get all tests
      const tests = [
        {
          service: TestList[0],
          reason: '',
          detailFile: undefined,
          errorMessage: ''
        },
        {
          service: TestList[2],
          reason: '',
          detailFile: undefined,
          errorMessage: ''
        },
        {
          service: TestList[2],
          reason: '',
          detailFile: undefined,
          errorMessage: ''
        }
      ]
      setTests(tests);
    }, [])
    
    const handleSubmit = () => {
      // alert("submit");
      //handleOnDisMissDialog() // reset when call api send request success
      props.onDismiss();
    }

    const _onchange = (value: string, messageErr, index) => {
      const newTests = tests.slice();
      newTests[index].reason = value;
      newTests[index].errorMessage = value.length === 0 ? "Vui lòng không để trống" : "";
      setTests(newTests);
    }

    const renderTestResult = (item: ITest, index) => {

      return (
        <div className='test-section'>
          <Label>{item.service}</Label>
          <div className='test-resutl'>
            <TextField 
              multiline
              placeholder="kết quả xét nghiệm"
              errorMessage={item.errorMessage}
              value={item.reason}
              onChange={(_, value) => _onchange(value, "Vui lòng không để trống", index)}
            />
            {item.errorMessage === "" ? <div className='no-error'></div> : undefined}
            {/* upload file */}
          </div>
        </div>
      )
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
              {tests.map((item, index) => renderTestResult(item, index))}
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