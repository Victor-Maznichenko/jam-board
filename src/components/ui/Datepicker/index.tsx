import {ru} from 'date-fns/locale/ru';
import LibraryDatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './Datepicker.scss';
import {DatepickerProps} from './types';

registerLocale('ru', ru);
setDefaultLocale('ru');

const Datepicker = (props: DatepickerProps) => {
  const handleChange = (date: Date) => props.setDate(date);

  return (
    <LibraryDatePicker
      {...props}
      className={props.className}
      selected={props.date}
      onChange={handleChange}
    />
  );
};

export default Datepicker;
