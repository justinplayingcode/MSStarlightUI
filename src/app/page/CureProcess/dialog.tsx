import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useBoolean } from '@fluentui/react-hooks';
import { Label, SearchBox, Stack } from '@fluentui/react';
import './index.scss'
import { Validate } from 'utils';
import Api from 'src/api/auth';

interface IStartProcessProps{
  isDialogClosed: boolean;
  closeDialog: () => void;
  clickSubmit?: () => void;
}

export const StartProcessDialog = (props: IStartProcessProps) => {
  const [insurance, setInsurance] = React.useState<string>();
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [item, setItem] = React.useState<any[]>();
  // const [is]

  const renderSearchResult = () => {
    return (
      <></>
    )
  }

  const handleOnSearch = (insurance: string) => {
      // if(!Validate.insurance(insurance)){
      //   setErrorMessage('Số bảo hiểm không hợp lệ');
      //   return;
      // }
      console.log(insurance);
      
      const reqbody = {
        insurance: insurance
      }
      setLoading(true)
      Api.cureProcessApi.getPatientByInsurance(reqbody).then(data => {
        if(data.data.length){
          console.log('result has lenght');
          
        } else{
          console.log('no result')
        }
          // const {accessToken, refreshToken, role, username } = data.data.data;
          // localStorage.setItem("accessToken", accessToken);
          // localStorage.setItem("refreshToken", refreshToken);
          // localStorage.setItem("username", username);
          // dispatch(setRole(role));
          // dispatch(setUsername(username));
          // history("/");
          console.log(data)
      }).catch(err => {
          const { message } = err.response.data;
          // setErrorMessage(message)
      }).finally(() => setLoading(false))
  }

  return (
      <Dialog
        hidden={props.isDialogClosed}
        onDismiss={props.closeDialog}
        dialogContentProps={{title: 'Đăng kí khám'}}
        maxWidth={'480px'}
        minWidth={'480px'}
        modalProps={{isBlocking: true}}
      >
        <Stack className='dialog-content'>
          <Stack className='search-section'>
            <Label>Nhập số bảo hiểm</Label>
            <SearchBox
              value={insurance}
              onSearch={(newVal) => {
                handleOnSearch(newVal);
              }}              
            />
            <Stack>{errorMessage}</Stack>
          </Stack>
          <Stack className='result-section'>
          {isLoading 
            ? <>Loading Result</>
            : renderSearchResult()
          }
          </Stack>
        </Stack>
        {/* <DialogFooter>
          <PrimaryButton onClick={props.closeDialog} text="Send" />
          <DefaultButton onClick={() => {
              props.closeDialog();
              props.clickSubmit?.();  
            }
          } text="Don't send" />
        </DialogFooter> */}
      </Dialog>
  );
};
