import type { ITimeSerie } from 'types'

interface IHourOptions {
  time: string
  symbolCode?: string
  airTemperature?: number
  windSpeed?: number
  windSpeedOfGust?: number
  windFromDirection?: number
  precipitationAmount?: number
  /** Puts the symbol in next_6_hours instead, as Yr does further ahead. */
  useSixHourSymbol?: boolean
  noSymbol?: boolean
}

/** Builds the slice of a Yr time serie that the app actually reads. */
export const buildHour = ({
  time,
  symbolCode = 'cloudy',
  airTemperature = 5,
  windSpeed = 3,
  windSpeedOfGust,
  windFromDirection = 11.1,
  precipitationAmount = 0,
  useSixHourSymbol = false,
  noSymbol = false,
}: IHourOptions): ITimeSerie => {
  const summary = { summary: { symbol_code: symbolCode } }

  return {
    time,
    data: {
      instant: {
        details: {
          air_temperature: airTemperature,
          wind_speed: windSpeed,
          wind_speed_of_gust: windSpeedOfGust,
          wind_from_direction: windFromDirection,
        },
      },
      ...(noSymbol
        ? {}
        : useSixHourSymbol
          ? { next_6_hours: summary }
          : {
              next_1_hours: {
                ...summary,
                details: { precipitation_amount: precipitationAmount },
              },
            }),
    },
  } as unknown as ITimeSerie
}

/** A day of `hours` entries, all sharing one symbol unless overridden. */
export const buildDay = (
  date: string,
  hours: number,
  options: Omit<IHourOptions, 'time'> = {}
): Array<ITimeSerie> =>
  Array.from({ length: hours }, (_, index) =>
    buildHour({
      ...options,
      time: `${date}T${String(index).padStart(2, '0')}:00:00Z`,
    })
  )
