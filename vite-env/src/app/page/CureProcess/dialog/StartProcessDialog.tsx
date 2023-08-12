import * as React from 'react';
import { Dialog, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Label, SearchBox, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { openPanel, setCurentId } from '../../../../redux/reducers';
import { panelTypeConstant } from '../../../../model/contant';
import { Convert } from '../../../../utils';
import { ApiStatus } from '../../../../model';
import Api from '../../../../api';

interface IStartProcessProps{
  isDialogClosed: boolean;
  closeDialog: () => void;
}

export const StartProcessDialog = (props: IStartProcessProps) => {
  const [insurance, _] = React.useState<string>();
  const [isLoading, setLoading] = React.useState<boolean>(false)

  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [item, setItem] = React.useState<{_id: any, fullname: any, gender: any, dateOfBirth: any, address: any}>();
  const [available, setAvailable] = React.useState<boolean>();
  const [searchText, setSearchText] = React.useState<string>();

  const dispatch = useDispatch();  

  const resetDialog = () => {
    setErrorMessage(undefined);
    setAvailable(undefined);
    setItem(undefined);
  }

  const renderSearchResult = () => {
    if(available){
      if (!!item) {
        return (
          <Stack className='patient-preview'
            onClick={() => {
              dispatch(setCurentId(item._id));
              dispatch(openPanel(panelTypeConstant.PANEL_EDIT_PATIENT))
              resetDialog();
              props.closeDialog();
            }}
          >
            <Stack horizontal horizontalAlign='space-between'>
              <Stack>Họ và tên: {item?.fullname}</Stack>
              <Stack>Giới tính: {Convert.convertGender(item?.gender)}</Stack>
            </Stack>
            <Stack>Ngày sinh: {item?.dateOfBirth}</Stack>
            <Stack>Địa chỉ: {item?.address}</Stack>
          </Stack>
        )
      } 
      else {
        return (
          <Stack>Không tìm thấy bệnh nhân</Stack>
        )
      }
    }
    return <></>;
  }

  const handleOnSearch = (insurance: string) => {
      const reqbody = {
        insurance: insurance
      }
      setLoading(true)
      Api.cureProcessApi.getPatientByInsurance(reqbody).then(data => {
        if(data.status === ApiStatus.succes){        
          setItem(data.data[0]);
          setAvailable(true);
        } else{
          setAvailable(false)
        }
      }).catch(() => {

      }).finally(() => setLoading(false))
  }

  return (
    <Dialog
      hidden={props.isDialogClosed}
      onDismiss={() => {
        props.closeDialog?.();
        resetDialog();
      }}
      dialogContentProps={{ title: 'Đăng kí khám' }}
      maxWidth={'480px'}
      minWidth={'480px'}
      modalProps={{ isBlocking: true }}
    >
      <Stack className='dialog-content'>
        <Stack className='search-section'>
          <Label>Nhập số bảo hiểm</Label>
          <Stack horizontal >
            <SearchBox
              showIcon={false}
              styles={{root: {flex: 1}}}
              value={insurance}
              onChange={(_, val) => {
                setSearchText(val);
              }}
              onSearch={(newVal) => {
                handleOnSearch(newVal);
              }}
            />
            <PrimaryButton text={'Tìm kiếm'} 
              onClick={() => handleOnSearch(searchText as any)}
            />
          </Stack>
          <Stack>{errorMessage}</Stack>
        </Stack>
        <Stack className='result-section'>
          {isLoading
            ? <Spinner size={SpinnerSize.large} label='Loading ...' labelPosition="right" />
            : renderSearchResult()
          }
        </Stack>
      </Stack>
      <DialogFooter>
        <DefaultButton onClick={() => {
          props.closeDialog?.()
          resetDialog();
        }}
          text="Hủy"
        />
        {available && (!!item
          ? <PrimaryButton onClick={() => {
              dispatch(setCurentId(item._id));
              dispatch(openPanel(panelTypeConstant.PANEL_EDIT_PATIENT))
              resetDialog();
              props.closeDialog();
          }
          } text="Tiếp tục" />
          : <PrimaryButton onClick={() => {
              resetDialog();
              dispatch(openPanel(panelTypeConstant.PANEL_CREATE_PATIENT))
              props.closeDialog();
          }
          } text="Tạo mới" />
        )
        }
      </DialogFooter>
    </Dialog>
  );
};
