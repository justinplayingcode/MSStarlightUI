import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import Api from "api";
import { patientonboardingtColumns } from "../../components/table/patientonboarding";

const PatientOutOnboarding = () => {

    return(
      <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
            integrateItems={Api.cureProcessApi.getPatientsOnBoarding}
            columns={patientonboardingtColumns}
            commandBarItems={[]}  
            tableType={TableType.schedulePatientOut}       
        />
      </div>
    )
}

export default PatientOutOnboarding;