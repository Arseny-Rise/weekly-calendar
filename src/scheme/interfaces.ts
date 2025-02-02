type WeekDays = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс' | ''
export interface Iproduct {
  name: string
  hours: number
  daily: boolean
  weekday?: WeekDays
  datepicker?: null
  all?: number
}

export interface IweekGenerator {
  name: string
  tasks: Iproduct[]
  count: number
}
