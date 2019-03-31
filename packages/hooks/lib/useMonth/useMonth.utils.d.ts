declare type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6
export interface GetWeekDaysProps {
  weekStartsOn?: WeekStartsOn
  weekDayFormat?(date: Date): string
}
export declare function getWeekDays({weekStartsOn, weekDayFormat}?: GetWeekDaysProps): never[]
export interface GetDaysProps {
  year: number
  month: number
  weekStartsOn?: WeekStartsOn
  dayFormat?(date: Date): string
}
export declare type CalendarDay =
  | number
  | {
      day: string
      date: Date
    }
export declare function getDays({year, month, weekStartsOn, dayFormat}: GetDaysProps): CalendarDay[]
export {}
