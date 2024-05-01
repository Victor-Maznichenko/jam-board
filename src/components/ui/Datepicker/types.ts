import {ReactDatePickerProps} from 'react-datepicker';

export interface DatepickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  date: Date;
  className?: string;
  setDate: (date: Date) => void;
}
