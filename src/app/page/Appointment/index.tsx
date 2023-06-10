import { Calendar, DefaultButton, Dropdown, ICommandBarItemProps, IDropdownOption, PrimaryButton, Stack, TextField } from '@fluentui/react';
import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { doctormanagementColumns } from '../table/doctormanagercolumn';
import Api from 'api';
import { TableType, toastType } from 'src/model/enum';
import { closeLoading, openLoading, showToastMessage, tableRefresh } from 'src/redux/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import './index.scss'
import { useEffect, useState } from 'react';
import { doctorInDepartmentColumns } from '../table/doctorInDepartmentColumn';
import { AxiosResponse } from 'axios';

const Appointment = () => {
    const dispatch = useDispatch();
    const { tableSelectedCount } = useSelector((state: RootState) => state.currentSelected);

    const [departmentList, setDepartmentList] = useState<any[]>();
    const [departmentId, setDepartmentId] = useState<string>("");
    const [name, setName] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [description, setDescription] = useState<string>();
    const [errorMessage, setErrormessage] = useState<string>();


    const getDepartment = () => {
        dispatch(openLoading())
        Api.departmentApi.getAllDepartment().then(data => {
          const list: IDropdownOption[] = [];
          data.data.map((item) => {
            if(item.name !== 'Khoa Tiếp Đón' && item.name !== 'Khoa Cận Lâm Sàng'){
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

    useEffect(() => {
        setName('abc')
    }, [tableSelectedCount])

    const handldeChangeDropDown = (_ ,option) => {
      setDepartmentId(option.key);
    }

    const integrateItems = (reqbody): Promise<AxiosResponse<any, any>> => {
      const body = {
        ...reqbody,
        departmentId
      };
      return Api.departmentApi.getAllDoctorInDepartment(body);
    }

    const handleSearch = () => {
      dispatch(tableRefresh())
    }

    return(
        <div className='wrapper-table-content'>
            <Stack className='appointment-container' horizontal tokens={{childrenGap: 20}}>
                <Stack className='appointment-left' tokens={{childrenGap: 20}}>
                    <Stack>
                        <Dropdown
                            label='Chọn khoa khám'
                            options={departmentList}
                            onChange={handldeChangeDropDown}
                        />
                        <PrimaryButton text='Tìm kiếm' 
                          onClick={handleSearch}
                        />
                    </Stack>
                    <UniformTable
                        integrateItems={integrateItems}
                        tableType={TableType.doctorInDepartment}
                        columns={doctorInDepartmentColumns}
                        commandBarItems={[]}
                    />
                </Stack>
                <Stack className='appointment-right'>
                    <Stack>
                        <Stack>Chọn ngày khám</Stack>
                        <Calendar
                            value={selectedDate}
                            onSelectDate={(date) => {
                                setErrormessage(undefined);
                                setSelectedDate(date);
                            }}
                        />

                    </Stack>
                    <TextField
                        required
                        label='Lý do khám'
                        multiline
                        resizable={false}
                        rows={8}
                        value={description}
                        onChange={(e, val) => {
                            setErrormessage(undefined);
                            setDescription(val)
                        }}
                    />
                    <Stack>
                        {(name && !selectedDate) &&(
                            <>
                            <Stack>Bác sĩ {name}</Stack>
                            {/* <Stack>Ngày: {Convert.datetoddmmyyy(selectedDate)}</Stack> */}
                            </>

                        ) }
                    </Stack>
                    <Stack horizontal>
                        <DefaultButton text='Reset'/>
                        <PrimaryButton text='Đăng kí'/>
                    </Stack>
                </Stack>

            </Stack>
        </div>
    )
}

export default Appointment;