import { UniformPanel } from "src/app/common";
import { BtnType } from "src/model/enum";
import { IFooterPanel } from "src/model/interface";

function CreatDoctorPanel() {


  const buttonFooter: IFooterPanel[] = [
    {
      text: 'Lưu',
      type: BtnType.Primary,
      disabled: false,
      onClick: () => alert('Save') // sau se truyen ham post api create
    }
  ]

  return (
    <UniformPanel
      panelTitle='Tạo tài khoản bác sĩ'
      renderFooter={buttonFooter}
    >
      {/* content here */}
      content here
    </UniformPanel>
  );
}

export default CreatDoctorPanel