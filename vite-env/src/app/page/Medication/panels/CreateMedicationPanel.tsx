import { Stack, TextField } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BtnType, PanelType, toastType } from "../../../../model/enum";
import { RootState } from "../../../../redux/store";
import { IFooterPanel } from "../../../../model/interface";
import { closePanel, closePanelLoading, openPanelLoading, showToastMessage, tableRefresh } from "../../../../redux/reducers";
import Api from "../../../../api";
import { UniformPanel } from "../../../common";

interface ICreateMedicationProps{
    panelType?: PanelType;
}

const CreateMedicationPanel = (props: ICreateMedicationProps) => {
    const dispatch = useDispatch();
    const {tableSelectedItem} = useSelector((state: RootState) => state.currentSelected)
    
    const [errorMessage, setErrorMessage] = useState<Dictionary<string>>();

    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>();
    const [designation, setDesignation] = useState<string>();
    const [usage, setUsage] = useState<string>();
    const [price, setPrice] = useState<string>();

      useEffect(() => {
        if(props.panelType === PanelType.Edit){
            setId(tableSelectedItem[0]?._id)
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
                    onChange={(_, val) => {
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
                    onChange={(_, val) => {
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
                    onChange={(_, val) => {
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
                    onChange={(_, val) => {
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
        dispatch(openPanelLoading());
        const reqbody = {
            ...(props.panelType === PanelType.Edit) && {id: id},
            name: name,
            designation: designation,
            usage: usage,
            price: price
        }
        if (props.panelType == PanelType.Create){
            Api.medicationApi.createMedication(reqbody).then((data) => {
                if(data.status === 0){
                  dispatch(showToastMessage({message: "Thêm thuốc mới thành công", type: toastType.succes}))
                  dispatch(closePanel());
                  dispatch(tableRefresh())
                }
            }).catch(() => {
              dispatch(showToastMessage({message: "Có lỗi, vui lòng liên hệ bộ phận hỗ trợ", type: toastType.error}))
            }).finally(() => dispatch(closePanelLoading()))
        }
        if (props.panelType == PanelType.Edit){
            Api.medicationApi.editMedication(reqbody).then((data) => {
                if(data.status === 0){
                  dispatch(showToastMessage({message: "Cập nhật thành công", type: toastType.succes}))
                  dispatch(closePanel());
                  dispatch(tableRefresh())
                }
            }).catch(() => {
              dispatch(showToastMessage({message: "Có lỗi, vui lòng liên hệ bộ phận hỗ trợ", type: toastType.error}))
            }).finally(() => dispatch(closePanelLoading()))
        }

    }

    return (
        <>
            <UniformPanel
                panelTitle='Tạo thuốc mới'
                renderFooter={buttonFooter}
            >
              {<Stack className='form-input'>
                {renderInputField()}
              </Stack>}
            </UniformPanel>
        </>
    )
}

export default CreateMedicationPanel;

