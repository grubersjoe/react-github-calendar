'use client'

import { forwardRef, useCallback, useEffect, useState } from 'react'
import { ActivityCalendar, type Props as ActivityCalendarProps } from 'react-activity-calendar'
import { gitHubTheme, transformData } from './lib'
import type { Activity, ApiErrorResponse, ApiResponse, Year } from './types'

export type Props = {
  username: string
  errorMessage?: string
  throwOnError?: boolean
  transformData?: (data: Array<Activity>) => Array<Activity>
  year?: Year
} & Omit<ActivityCalendarProps, 'data'>

async function fetchCalendarData(username: string, year: Year): Promise<ApiResponse> {
  const apiUrl = 'https://github-contributions-api.jogruber.de/v4/'
  const response = await fetch(`${apiUrl}${username}?y=${String(year)}`)
  const data = (await response.json()) as ApiResponse | ApiErrorResponse

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
    )
  }

  return data as ApiResponse
}

export const GitHubCalendar = forwardRef<HTMLElement, Props>(
  (
    {
      username,
      year = 'last',
      labels,
      transformData: transformFn,
      throwOnError = false,
      errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
      ...props
    },
    ref,
  ) => {
    const [data, setData] = useState<ApiResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = useCallback(() => {
      setLoading(true)
      setError(null)
      fetchCalendarData(username, year)
        .then(setData)
        .catch((err: unknown) => {
          if (err instanceof Error) {
            setError(err)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }, [username, year])

    useEffect(fetchData, [fetchData])

    // React error boundaries can't handle asynchronous code, so rethrow.
    if (error) {
      if (throwOnError) {
        throw error
      } else {
        return <div>{errorMessage}</div>
      }
    }

    if (loading || !data) {
      return <ActivityCalendar data={[]} loading />
    }

    const theme = props.theme ?? gitHubTheme

    const defaultLabels = {
      totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
    }

    return (
      <ActivityCalendar
        data={transformData(data.contributions, transformFn)}
        labels={Object.assign({}, defaultLabels, labels)}
        ref={ref}
        {...props}
        theme={theme}
        loading={Boolean(props.loading) || loading}
        maxLevel={4}
      />
    )
  },
)

GitHubCalendar.displayName = 'GitHubCalendar'
