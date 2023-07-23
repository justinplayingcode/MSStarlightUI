import { Label, Modal, PrimaryButton, TextField } from '@fluentui/react';
import * as React from 'react'
import "./index.scss";
import { basicKeyValueRender } from 'src/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';
import { useEffect, useState } from 'react';
import { TestList } from 'src/model/doctorModel';
import { useDispatch } from 'react-redux';
import { closeLoading, openLoading, showToastMessage, tableRefresh } from 'src/redux/reducers';
import Api from 'api';
import { toastType } from 'src/model/enum';
import FileUpload from 'src/app/common/FileUpload';
import FileItem from 'src/app/common/FileUpload/FileItem';

interface ITest{
  service: string;
  reason: string;
  serviceId: string;
  detailsFileCloud: File;
  errorMessage: string;
  resultId: string;
}

export interface ITestingProps{
  isOpen: boolean;
  onDismiss: () => void;
  scheduleId: any;
}

export const TestingForm = ({...props}: ITestingProps) => {
    const {tableSelectedItem } = useSelector((state: RootState) => state.currentSelected)
    const [tests, setTests] = React.useState<ITest[]>([]);
    // const [resultFile, setResultFile] = useState<File[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
      if(props.isOpen) {
        dispatch(openLoading());
        Api.scheduleApi.allTestRequest({ appointmentScheduleId: props.scheduleId }).then(data => {
          if(!data.status) {
            let arr: any[] = data.data;
            let tests = arr.map((item) => {
              return {
                service: TestList[item.service],
                serviceId: item.serviceId,
                resultId: item._id,
                errorMessage: "",
                reason: "",
                detailsFileCloud: undefined
              }
            })
            setTests(tests);
          } else {
            dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
            handleDismis();
          }
        }).catch(() => {
          dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
          handleDismis();
        }).finally(() => dispatch(closeLoading()));
      }
    }, [props.isOpen])

    const handleDismis = () => {
      dispatch(tableRefresh());
      props.onDismiss();
    }
    
    const handleSubmit = () => {
      if(tests.some(item => item.reason === "")) {
        setTests(tests.map((item) => {
          return {
            ...item,
            errorMessage: item.reason !== "" ? "" : "Vui lòng không để trống"
          }
        }))
        return;
      }
      const appointmentScheduleId = tableSelectedItem[0]._id;
      const formData = new FormData();
      tests.forEach((result, index) => {
        formData.append(`testResultIds[${index}]`, result.resultId);
        formData.append(`reasons[${index}]`, result.reason);
        formData.append(`detailsFileClouds[${index}]`, result.detailsFileCloud);
        formData.append(`nameFiles[${index}]`, result.detailsFileCloud.name);
      });
      dispatch(openLoading());
      Api.scheduleApi.doneTesting( appointmentScheduleId, formData).then(data => {
        if(!data.status) {
          dispatch(showToastMessage({message: 'Gửi kết quả thành công', type: toastType.succes}));
          handleDismis();
        } else {
          dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
        }
      }).catch(() => dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}))).finally(() => dispatch(closeLoading()));
    }

    const _onchange = (key, value: any, index, id?) => {
      const newTests = tests.slice();
      switch(key) {
        case 'reason':
          newTests[index].reason = value;
          newTests[index].errorMessage = value.length === 0 ? "Vui lòng không để trống" : "";
          break;
        case 'file':
          let arr = newTests.map(e => e.resultId);
          newTests[arr.indexOf(id!)].detailsFileCloud = value;
          break;
      }
      setTests(newTests);
    }

    const renderTestResult = (item: ITest, index) => {

      return (
        <div className='test-section' key={index}>
          <Label>{item.service}</Label>
          <div className='test-resutl'>
            <TextField 
              multiline
              placeholder="kết quả xét nghiệm"
              value={item.reason}
              errorMessage={item.errorMessage}
              onChange={(_, value) => _onchange( 'reason', value, index)}
            />
            {item.errorMessage === "" ? <div className='no-error'></div> : undefined}
            {/* upload file */}
            <div className='test-resutl-upload'>
              <FileUpload 
                files={[item.detailsFileCloud]} 
                isView={false} 
                multiple={false}
                text='Tải lên kết quả'
                accept="image/*"
                addFiles={(values) => _onchange( 'file', values[0], index, item.resultId)}
                index={index}
              />
              {!!item.detailsFileCloud && 
                <FileItem
                  file={item.detailsFileCloud || undefined}
                  deleteFile={() => _onchange( 'file', undefined, index, item.resultId)}
                />
              }
            </div>
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