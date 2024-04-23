import {ru} from 'date-fns/locale/ru';
import LibraryDatePicker, {ReactDatePickerProps, registerLocale, setDefaultLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './Datepicker.scss';

registerLocale('ru', ru);
setDefaultLocale('ru');

interface DatepickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  date: Date;
  className?: string;
  setDate: (date: Date) => void;
}

const Datepicker = (props: DatepickerProps) => {
  const handleChange = (date: Date) => props.setDate(date);

  return (
    <LibraryDatePicker {...props} className={props.className} selected={props.date} onChange={handleChange} />
  );
};

export default Datepicker;
