import Api from "api";
import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import { appointmentColumn } from "../components/table/appointmentcolumn";

function AppointmentReportStatic() {
  return ( 
    <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
            integrateItems={Api.scheduleApi.patientGetListScheduleRequest}
            columns={appointmentColumn}
            commandBarItems={[]}  
            tableType={TableType.scheduleRequestOfPatient}       
        />
    </div>
  );
}

export default AppointmentReportStatic;