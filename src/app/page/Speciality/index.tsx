import { Stack } from '@fluentui/react';
import image from 'image';
import './index.scss';
import NavigateButton from 'src/app/common/navigateButton';

interface ISpecialityItem {
    title: string;
    link: string;
    icon: string;
}

const Speciality = () => {

    const specialityList: ISpecialityItem[] = [
        {
            title: 'Bộ Phận Tiếp Đón',
            link: '/speciality', // sửa lại link
            icon: image.receptionist
        },
        {
            title: 'Khoa Nội Tổng Hợp',
            link: '/speciality',
            icon: image.endocrine
        },
        {
            title: 'Khoa Ngoại',
            link: '/speciality',
            icon: image.surgeon
        },
        {
            title: 'Khoa Cận Lâm Sàng',
            link: '/speciality',
            icon: image.testdepartment
        },
        {
            title: 'Khoa Sản',
            link: '/speciality',
            icon: image.obstetrics
        },
        {
            title: 'Khoa Da Liễu',
            link: '/speciality',
            icon: image.skin
        },
        {
            title: 'Khoa Đông Y',
            link: '/speciality',
            icon: image.oriental
        },
        {
            title: 'Khoa Truyền Nhiễm',
            link: '/speciality',
            icon: image.infetion
        },
        {
            title: 'Khoa Dược',
            link: '/speciality',
            icon: image.medicine
        },
        {
            title: 'Khoa Nhi',
            link: '/speciality',
            icon: image.pediatrics
        },
        {
            title: 'Khoa Thận Nhân Tạo',
            link: '/speciality',
            icon: image.kidney
        },
    ]


    return(
        <div className='speciality-wrapper'>
            {
                specialityList.map((e) => {
                    return (
                        <NavigateButton 
                            title={e.title}
                            navigateTo={e.link}
                            icon={e.icon}
                        />
                    )
                })
            }
        </div>
    )
}
export default Speciality;