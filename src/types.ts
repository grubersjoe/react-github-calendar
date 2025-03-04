export type Activity = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type Year = number | 'last'

export type ApiResponse = {
  total: {
    [year: number]: number
    [year: string]: number // 'lastYear;
  }
  contributions: Array<Activity>
}

export type ApiErrorResponse = {
  error: string
}
