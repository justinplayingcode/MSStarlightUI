import { ICommandBarItemProps } from '@fluentui/react';

import { accountRole } from 'model';
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { RootState } from 'src/redux/store';
import { tooltipPlainText } from 'src/utils/utils';
import { useDispatch } from 'react-redux';
import { openPanel } from 'src/redux/reducers';
import { panelTypeConstant } from 'src/model/contant';
import Api from 'api';
import { TableType } from 'src/model/enum';

const Diseases = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state: RootState) => state.user);
    const { tableSelectedCount } = useSelector((state: RootState) => state.currentSelected)

    const diseasesColumns =[
        {
            key: 'code',
            name: 'Mã bệnh',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            onRender: (item) => {
                return <div>{item?.code}</div>;
            },
        },
        {
            key: 'name',
            name: 'Tên bệnh',
            minWidth: 180,
            maxWidth: 250,
            isResizable: true,
            onRender: (item) => {
                return <span>{item?.name}</span>;
            },
        },
        {
            key: 'symptom',
            name: 'Triệu chứng',
            minWidth: 230,
            maxWidth: 350,
            isResizable: true,
            onRender: (item) => {
                return (tooltipPlainText(item?.symptom));
            },
        },
        {
            key: 'prevention',
            name: 'Cách phòng tránh',
            minWidth: 230,
            maxWidth: 350,
            isResizable: true,
            onRender: (item) => {
                return (tooltipPlainText(item?.prevention));
            },
        },
        {
            key: 'department',
            name: 'Khoa',
            minWidth: 230,
            maxWidth: 350,
            isResizable: true,
            onRender: (item) => {
                return <span>{item?.department}</span>;
            },
        },

    ];

    const getDiseasesCommanBar = () => {
        const commadBarButton: ICommandBarItemProps[] =[];
        if(role === accountRole.Admin){
            commadBarButton.push(
            {
                key: 'newItem',
                text: 'Thêm',
                iconProps: { iconName: 'Add' },
                onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_DISEASES)) },
            });
            if (tableSelectedCount === 1){
                commadBarButton.push(
                    {
                        key: 'editItem',
                        text: 'Sửa',
                        iconProps: { iconName: 'Edit' },
                        onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_EDIT_DISEASES)) },
                    },
                    {
                        key: 'deleteItem',
                        text: 'Xóa',
                        iconProps: { iconName: 'Delete' },
                        onClick: () => { alert('Xóa') },
                    }
                )
            }
        }
        return commadBarButton;
    } 
    return(
        <div className='wrapper-table-content'>
            <UniformTable
                columns={diseasesColumns}  
                commandBarItems={getDiseasesCommanBar()}     
                integrateItems={Api.diseasesApi.getAllDiseases}
                tableType={TableType.diseases}      
            />
        </div>
    )
}
export default Diseases;