import { Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { useState } from "react";
import { UniformPanel } from "src/app/common";
import { BtnType, PanelType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";

interface ICreateMedicationProps{
    panelType?: PanelType;
}

const CreateMedicationPanel = (props: ICreateMedicationProps) => {
    const [isLoading, setIsLoading] = useState<boolean>();

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
            {    props.panelType === PanelType.Create 
            ? <>panel tạo</>
            : <>Panel sửa</>
       }</>
        )
    }

    const clickSave = () => {

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