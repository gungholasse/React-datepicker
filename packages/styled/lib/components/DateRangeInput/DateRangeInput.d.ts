import React from 'react'
import {UseDatepickerProps, FormatFunction, FocusedInput} from '@datepicker-react/hooks'
import {DateRangeInputPhrases} from '../../phrases'
export interface DateRangeInputProps extends UseDatepickerProps {
  displayFormat?: string | FormatFunction
  phrases?: DateRangeInputPhrases
  onFocusChange(focusInput: FocusedInput): void
  showStartDateCalendarIcon?: boolean
  showEndDateCalendarIcon?: boolean
  onClose?(): void
  vertical?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  showClose?: boolean
  rtl?: boolean
  placement?: 'top' | 'bottom'
  dayFormat?(date: Date): string
  weekDayFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
}
declare function DateRangeInput({
  startDate,
  endDate,
  minBookingDate,
  maxBookingDate,
  firstDayOfWeek,
  onFocusChange,
  numberOfMonths,
  focusedInput,
  onDateChange,
  exactMinBookingDays,
  dayFormat,
  weekDayFormat,
  monthLabelFormat,
  onDayRender,
  showClose,
  showSelectedDates,
  showResetDates,
  vertical,
  rtl,
  isDayBlocked,
  minBookingDays,
  onClose,
  showStartDateCalendarIcon,
  showEndDateCalendarIcon,
  displayFormat,
  phrases,
  placement,
}: DateRangeInputProps): JSX.Element
export default DateRangeInput
