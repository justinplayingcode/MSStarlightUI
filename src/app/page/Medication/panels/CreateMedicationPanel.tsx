import { IDropdownOption, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import Api from "api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UniformPanel } from "src/app/common";
import { BtnType, PanelType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";
import { closePanel } from "src/redux/reducers";
import { RootState } from "src/redux/store";

interface ICreateMedicationProps{
    panelType?: PanelType;
}

const CreateMedicationPanel = (props: ICreateMedicationProps) => {
    const dispatch = useDispatch();
    const {tableSelectedItem} = useSelector((state: RootState) => state.currentSelected)
    
    const [isLoading, setIsLoading] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

    const [name, setName] = useState<string>();
    const [designation, setDesignation] = useState<string>();
    const [usage, setUsage] = useState<string>();
    const [price, setPrice] = useState<string>();

    
      useEffect(() => {
        if(props.panelType === PanelType.Edit){
            setName(tableSelectedItem[0]?.name);
            setDesignation(tableSelectedItem[0]?.designation);
            setUsage(tableSelectedItem[0]?.usage);
            setPrice(tableSelectedItem[0]?.price);
        }        
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
        return (
            <>
                <TextField
                    required
                    label="Tên thuốc"
                    value={name}
                    onChange={(e, val) => {
                        setErrorMessage(undefined);
                        setName(val)
                    }}
                    errorMessage={errorMessage?.name}
                />
                <TextField
                    required
                    multiline
                    label="Chỉ định"
                    value={designation}
                    onChange={(e, val) => {
                        setErrorMessage(undefined);
                        setDesignation(val)
                    }}
                    errorMessage={errorMessage?.designation}
                />
                <TextField
                    required
                    multiline
                    label="Công dụng"
                    value={usage}
                    onChange={(e, val) => {
                        setErrorMessage(undefined);
                        setUsage(val);
                    }}
                    errorMessage={errorMessage?.usage}
                />
                <TextField
                    required
                    label="Giá"
                    suffix='đ'
                    value={price}
                    onChange={(e, val) => {
                        setErrorMessage(undefined);
                        setPrice(val);
                    }}
                    errorMessage={errorMessage?.price}
                />
            </>
        )
    }

    const clickSave = () => {
        //validate
        if(!name){
            setErrorMessage({name: 'Hãy điền tên thuốc'});
            return;
        }
        if(!designation){
            setErrorMessage({designation: 'Hãy điền chỉ định thuốc'});
            return;
        }
        if(!usage){
            setErrorMessage({usage: 'Hãy điền công dụng thuốc'});
            return;
        }
        if(!price){
            setErrorMessage({price: 'Hãy điền giá thuốc'});
            return;
        }

        const reqbody = {
            name: name,
            designation: designation,
            usage: usage,
            price: price
        }
        setIsLoading(true);
        if (props.panelType == PanelType.Create){
            Api.medicationApi.createMedication(reqbody).then((data) => {
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
            Api.medicationApi.editMedication(reqbody).then((data) => {
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
                panelTitle='Tạo tài khoản bác sĩ'
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

export default CreateMedicationPanel;

