import Api from "api";
import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import { nonBoardingPatientColumns } from "../components/table/nonboardingcolumn";

const TestingTab = () => {
    return (
      <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
                integrateItems={Api.cureProcessApi.getWaitedPatient}
                columns={nonBoardingPatientColumns}
                commandBarItems={[]} 
                tableType={TableType.scheduleParaclinical}
            />
      </div>
    )
}

export default TestingTab;