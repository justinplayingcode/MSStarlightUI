import { Dropdown, IDropdownOption, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { UniformPanel } from "src/app/common";
import { BtnType, PanelType } from "src/model/enum"
import { IFooterPanel } from "src/model/interface";
import Api from 'src/api/index'
import { Dictionary } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { closePanel } from "src/redux/reducers";

interface ICreateDiseasesProps{
    panelType?: PanelType
}


const CreateDiseasesPanel = (props: ICreateDiseasesProps) => {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    const [departmentList, setDepartmentList] = useState<any[]>();

    const [name, setName] = useState<string>();
    const [code, setCode] = useState<string>();
    const [symptom, setSymptom] = useState<string>();
    const [prevention, setPrevention] = useState<string>();
    const [selectedDepartment, setSelectedDepartment] = useState<string>()

    const getDepartment = () => {
        setIsLoading(true);
        Api.departmentApi.getAllDepartment().then(data => {
          const list: IDropdownOption[] = [];
          data.data.map((item) => {
            list.push({
              key: item._id,
              text: item.name,
            })
          })
          setDepartmentList(list);
        }).catch(err => {
            const { message } = err.response.data;
            // setErrorMessage(message)
        }).finally(() => setIsLoading(false))
      }
    
      useEffect(() => {
        if(props.panelType === PanelType.Edit){
            
        }
        
        getDepartment();
      },[])

    const buttonFooter: IFooterPanel[] = [
        {
          text: 'Lưu',
          type: BtnType.Primary,
          disabled: false,
          onClick: () => clickSave() // sau se truyen ham post api create
        }
    ];

    const renderInputField = () => {
        return(
            <>
                <TextField
                    required
                    label="Tên bệnh"
                    value={name}
                    onChange={(e, val) => {
                        setErrorMessage(undefined)
                        setName(val)
                    }}
                />
                <TextField
                    required
                    label="Mã bệnh"
                    value={code}
                    onChange={(e, val) => {
                        setErrorMessage(undefined)
                        setCode(val)
                    }}
                />
                <TextField 
                    required
                    label="Triệu chứng" 
                    multiline 
                    autoAdjustHeight 
                    value={symptom}
                    onChange={(e, val) => {
                        setErrorMessage(undefined)
                        setSymptom(val)
                    }}
                />
                <TextField 
                    required
                    label="Cách phòng ngừa" 
                    multiline 
                    autoAdjustHeight 
                    value={prevention}
                    onChange={(e, val) => {
                        setErrorMessage(undefined)
                        setPrevention(val)
                    }}
                />
                <Dropdown
                    required
                    label='Khoa quản lý'
                    options={departmentList}
                    selectedKey={selectedDepartment}
                    onChange={(e, option) => {
                        setErrorMessage(undefined)
                        setSelectedDepartment(option.key as string)
                    }} 
                    errorMessage={errorMessage?.gender}
                />
            </>
        )
    }

    const clickSave = () => {

        const reqbody = {
            name: name,
            code: code,
            symptom: symptom,
            prevention: prevention,
            department: selectedDepartment
        }

        setIsLoading(true);
        if (props.panelType == PanelType.Create){
            Api.diseasesApi.createDiseases(reqbody).then((data) => {
                if(data.status === 0){
                    console.log(data)
                    alert("Success")
                    //if success, close panel
                    dispatch(closePanel())
                }
            }).catch(err => {
                const { message } = err.response.data;
                // setErrorMessage(message)
            }).finally(() => setIsLoading(false))
        }

        if (props.panelType == PanelType.Edit){
            Api.diseasesApi.editDiseases(reqbody).then((data) => {
                if(data.status === 0){
                    console.log(data)
                    alert("Success")
                    //if success, close panel
                    dispatch(closePanel())
                }
            }).catch(err => {
                const { message } = err.response.data;
                // setErrorMessage(message)
            }).finally(() => setIsLoading(false))
        }
    }

    return (
        <>
            <UniformPanel
                panelTitle='Thêm bệnh mới'
                renderFooter={buttonFooter}
            >
                {/* content here */}
                {
                    isLoading ? <Spinner size={SpinnerSize.large} />
                        : <Stack className='form-input'>
                            {renderInputField()}
                        </Stack>
                }
            </UniformPanel>
        </>
    )
}

export default CreateDiseasesPanel;