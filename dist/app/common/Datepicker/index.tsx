import * as React from 'react';
import { DatePicker, IDatePickerStrings } from '@fluentui/react';
import { Convert } from 'utils';

interface ICustomDatePickerProps {
  onChangeDate: (value) => void;
  errorMessage: string;
  currentDate?: Date;
}

const CustomDatePicker = ({...props}: ICustomDatePickerProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(null);

  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    props.onChangeDate(date);
  };

  const datePickerStrings: IDatePickerStrings = {
    months: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    shortMonths: [
      'Th1',
      'Th2',
      'Th3',
      'Th4',
      'Th5',
      'Th6',
      'Th7',
      'Th8',
      'Th9',
      'Th10',
      'Th11',
      'Th12',
    ],
    days: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    shortDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    goToToday: 'Hôm nay',
    prevMonthAriaLabel: 'Tháng trước',
    nextMonthAriaLabel: 'Tháng sau',
    prevYearAriaLabel: 'Năm trước',
    nextYearAriaLabel: 'Năm sau',
  };

  return (
    <div className='date-picker-container'>
      <DatePicker
        placeholder="Chọn ngày"
        value={props.currentDate || selectedDate}
        minDate={minDate}
        onSelectDate={handleSelectDate}
        strings={datePickerStrings}
        formatDate={Convert.datetoddmmyyy}
      />
      {props.errorMessage && <span className='common-error'>{props.errorMessage}</span>}
    </div>
  );
};

export default CustomDatePicker;
