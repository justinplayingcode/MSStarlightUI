import { Dropdown, IDropdownOption, TextField } from '@fluentui/react';
import * as React from 'react'
import { UniformTable } from 'src/app/common';
import Api from 'api';
import { DepartmentType, TableType, toastType } from 'src/model/enum';
import { closeLoading, openLoading, showToastMessage, tableRefresh } from 'src/redux/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './index.scss'
import { useEffect, useState } from 'react';
import { doctorInDepartmentColumns } from '../table/doctorInDepartmentColumn';
import { AxiosResponse } from 'axios';
import VerticalLinearStepper from 'src/app/common/stepper/VerticalStepper';
import { Convert } from 'utils';
import CustomDatePicker from 'src/app/common/datepicker';

const Appointment = () => {
    const dispatch = useDispatch();
    const { tableSelectedCount, tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
    const { fullname, dateOfBirth, insurance, address } = useSelector((state: RootState) => state.user.info);

    const [departmentList, setDepartmentList] = useState<any[]>();
    const [departmentId, setDepartmentId] = useState<string>("");
    const [departmentname, setDepartmentname] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [description, setDescription] = useState<string>();
    const [dateError, setDateError] = useState<string>("Hãy chọn ngày");
    const [descError, setDescError] = useState<string>("Hãy điền vào trường này");


    const getDepartment = () => {
        dispatch(openLoading())
        Api.departmentApi.getAllDepartment().then(data => {
          const list: IDropdownOption[] = [];
          data.data.map((item) => {
            if(item.departmentCode !== DepartmentType.tiepDon && item.departmentCode !== DepartmentType.canLamSang){
              list.push({
                key: item._id,
                text: item.departmentName,
              })
            }
          })

          setDepartmentList(list);
        }).catch(err => {
            const { message } = err.response.data;
              dispatch(showToastMessage({message: message, type: toastType.error}));
        }).finally(() => dispatch(closeLoading()))
      }

    useEffect(() => {
        getDepartment();
    },[])


    const handldeChangeDropDown = (_ ,option) => {
      setDepartmentId(option.key);
      setDepartmentname(option.text)
    }

    const integrateItems = (reqbody): Promise<AxiosResponse<any, any>> => {
      const body = {
        ...reqbody,
        departmentId
      };
      return Api.departmentApi.getAllDoctorInDepartment(body);
    }

    const handleReset = () => {
      setDepartmentId("");
      setDescription("");
      setSelectedDate(new Date);
    }

    const handleChangeDate = (value) => {
      setSelectedDate(value);
      setDateError(undefined)
    }

    const handleChangeDecs = (_, value) => {
      setDescription(value);
      if(value.trim() !== "") {
        setDescError(undefined)
      } else {
        setDescError("Hãy điền vào trường này")
      }
    }

    const searchDepartmentStep = () => {
      return (
        <div className='searchdepartmentstep'>
          <Dropdown
            label='Chọn khoa khám'
            options={departmentList}
            onChange={handldeChangeDropDown}
            className='dropdownstep'
            placeholder='Chọn 1 khoa'
          />
        </div>
      )
    }
    const selectDoctorStep = () => {
      return (
        <UniformTable
          integrateItems={integrateItems}
          tableType={TableType.doctorInDepartment}
          columns={doctorInDepartmentColumns}
          commandBarItems={[]}
        />
      )
    }

    const selectDateStep = () => {
      const info = [
        {
          key: "Người hẹn lịch",
          value: fullname
        },
        {
          key: "Ngày sinh",
          value: dateOfBirth
        },
        {
          key: "Địa chỉ",
          value: address
        },
        {
          key: "Mã số BHYT",
          value: insurance
        }
      ]

      const doctor = [
        {
          key: "Bác sĩ",
          value: tableSelectedItem[0]?.fullname
        },
        {
          key: "Chức vụ",
          value: Convert.getDoctorPosition(tableSelectedItem[0]?.position)
        },
        {
          key: "Chuyên môn",
          value: departmentname
        },
        {
          key: "Trình độ",
          value: Convert.getDoctorRank(tableSelectedItem[0]?.rank)
        },
      ]


      return (
        <div className='selectdatestep'>
          <div className='title'>Thông tin cá nhân: </div>
          {info.map((e, index) => basicInfoRender(e.key, e.value, index))}
          <div className='title'>Thông tin lịch hẹn: </div>
          {doctor.map((e, index) => basicInfoRender(e.key, e.value, index))}
          <div className='othersection'>
            <div className='title'>Chọn ngày hẹn: </div>
            <CustomDatePicker
              onChangeDate={handleChangeDate}
              errorMessage={dateError}
            />
          </div>
          <div className='othersection'>
            <div className='title'>Lí do, triệu chứng bệnh, ghi chú: </div> 
            <TextField
              className='textfield'
              multiline
              onChange={handleChangeDecs}
              resizable={false}
              errorMessage={descError}
              value={description}
            />
          </div>
        </div>
      )
    }

    const basicInfoRender = (key, value, index) => {
      return (
        <div className='basicInfoRender' key={index}>
          <div className='key'>{key}</div>
          <div className='value'>{value}</div>
        </div>
      )
    }

    const steps = [
      {
        label: "Lựa chọn khoa đăng ký khám bệnh",
        content: searchDepartmentStep(),
        disableNextStep: departmentId === ""
      },
      {
        label: "Lựa chọn bác sĩ",
        content: selectDoctorStep(),
        disableNextStep: tableSelectedCount === 0
      },
      {
        label: "Xác nhận thông tin, hẹn ngày khám",
        content: selectDateStep(),
        disableNextStep: false
      },
    ]

    const handleSubmit = () => {
      const reqBody = {
        departmentId,
        appointmentDate: Convert.datetommddyyyy(selectedDate),
        description: description.trim(),
        doctorId: tableSelectedItem[0]?.userId // sẽ thay bằng doctorId
        // doctorId: tableSelectedItem[0]?.doctorId 
      }
      console.log(reqBody)
    }

    return(
        <div className='appointment'>
          <VerticalLinearStepper 
            steps={steps}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
    )
}

export default Appointment;