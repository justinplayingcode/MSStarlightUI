import { Dropdown, IDropdownOption, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { UniformPanel } from "src/app/common";
import { BtnType, PanelType } from "src/model/enum"
import { IFooterPanel } from "src/model/interface";
import Api from 'src/api/index'
import { Dictionary } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { closePanel, tableRefresh } from "src/redux/reducers";
import { RootState } from "src/redux/store";

interface ICreateDiseasesProps{
    panelType?: PanelType
}


const CreateDiseasesPanel = (props: ICreateDiseasesProps) => {
    const dispatch = useDispatch();
    const {tableSelectedItem} = useSelector((state: RootState) => state.currentSelected)
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();
    const [departmentList, setDepartmentList] = useState<any[]>();

    const [id, setId] = useState<string>();
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
            setId(tableSelectedItem[0]?._id)
            setName(tableSelectedItem[0]?.name);
            setCode(tableSelectedItem[0]?.code);
            setSymptom(tableSelectedItem[0]?.symptom);
            setPrevention(tableSelectedItem[0]?.prevention);
            setSelectedDepartment(tableSelectedItem[0]?.department)
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
                    errorMessage={errorMessage?.name}
                />
                <TextField
                    required
                    label="Mã bệnh"
                    value={code}
                    onChange={(e, val) => {
                        setErrorMessage(undefined)
                        setCode(val)
                    }}
                    errorMessage={errorMessage?.code}
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
                    errorMessage={errorMessage?.symptom}
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
                    errorMessage={errorMessage?.prevention}
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
                    errorMessage={errorMessage?.department}
                />
            </>
        )
    }

    const clickSave = () => {
        //validate
        if(!name){
            setErrorMessage({name: 'Hãy điền tên bệnh'});
            return;
        }
        if(!code){
            setErrorMessage({code: 'Hãy điền mã bệnh'});
            return;
        }
        if(!symptom){
            setErrorMessage({symptom: 'Hãy điền triệu chứng bệnh'});
            return;
        }
        if(!prevention){
            setErrorMessage({name: 'Hãy điền cách phòng bệnh'});
            return;
        }
        if(!selectedDepartment){
            setErrorMessage({department: 'Hãy chọn khoa quản lý'});
            return;
        }

        const reqbody = {
            ...(props.panelType === PanelType.Edit) && {id: id},
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
                    dispatch(closePanel());
                    dispatch(tableRefresh())
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
                    alert("Success edit")
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