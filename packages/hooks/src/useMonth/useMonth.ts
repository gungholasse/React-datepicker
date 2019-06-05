import {useMemo} from 'react'
import format from 'date-fns/format'
import {getDays, GetDaysProps, getWeekDays, GetWeekDaysProps} from './useMonth.utils'

export const dayLabelFormatFn = (date: Date) => format(date, 'DD')
export const weekdayLabelFormatFn = (date: Date) => format(date, 'dd')
export const monthLabelFormatFn = (date: Date) => format(date, 'MMMM YYYY')

export interface UseMonthResult {
  weekDays: string[]
  days: (number | {day: string; date: Date})[]
  monthLabel: string
}

export interface UseMonthProps extends GetWeekDaysProps, GetDaysProps {
  monthLabelFormat?(date: Date): string
}

export function useMonth({
  year,
  month,
  firstDayOfWeek = 1,
  dayLabelFormat = dayLabelFormatFn,
  weekdayLabelFormat = weekdayLabelFormatFn,
  monthLabelFormat = monthLabelFormatFn,
}: UseMonthProps): UseMonthResult {
  const days = useMemo(() => getDays({year, month, firstDayOfWeek, dayLabelFormat}), [
    year,
    month,
    firstDayOfWeek,
    dayLabelFormat,
  ])
  const weekDays = useMemo(() => getWeekDays({firstDayOfWeek, weekdayLabelFormat}), [
    firstDayOfWeek,
    weekdayLabelFormat,
  ])

  return {
    days,
    weekDays,
    monthLabel: monthLabelFormat(new Date(year, month)),
  }
}
