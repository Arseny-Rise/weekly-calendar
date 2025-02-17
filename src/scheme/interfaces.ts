type WeekDays = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс' | ''
export interface Iproduct {
  name: string
  hours: number
  daily: boolean
  weekday?: WeekDays
  all?: number
  disabled?: boolean
}

export interface IweekGenerator {
  name: string
  tasks: Iproduct[]
  count: number
}
