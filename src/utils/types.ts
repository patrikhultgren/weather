export interface IError {
  name: string
  message: string
  status?: number
}

export interface IQuery<IResponse> {
  response: IResponse | null
  loading: boolean
  error: any
  searchHandler?: any
}

export interface IPosition {
  latitude: number
  longitude: number
  city: string
}

export interface ILocationIQPosition {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  boundingbox: string
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
}

export interface ITimeSerie {
  time: string
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number
        air_temperature: number
        air_temperature_percentile_10: number
        air_temperature_percentile_90: number
        cloud_area_fraction: number
        cloud_area_fraction_high: number
        cloud_area_fraction_low: number
        cloud_area_fraction_medium: number
        dew_point_temperature: number
        fog_area_fraction: number
        relative_humidity: number
        ultraviolet_index_clear_sky: number
        wind_from_direction: number
        wind_speed: number
        wind_speed_of_gust: number
        wind_speed_percentile_10: number
        wind_speed_percentile_90: number
      }
    }
    next_12_hours: {
      summary: {
        symbol_code: string
        symbol_confidence: string
      }
      details: {
        probability_of_precipitation: number
      }
    }
    next_1_hours: {
      summary: {
        symbol_code: string
      }
      details: {
        precipitation_amount: number
        precipitation_amount_max: number
        precipitation_amount_min: number
        probability_of_precipitation: number
        probability_of_thunder: number
      }
    }
    next_6_hours: {
      summary: {
        symbol_code: string
      }
      details: {
        air_temperature_max: number
        air_temperature_min: number
        precipitation_amount: number
        precipitation_amount_max: number
        precipitation_amount_min: number
        probability_of_precipitation: number
      }
    }
  }
}

export interface IForecast {
  type: string
  geometry: {
    type: string
    coordinates: Array<number>
  }
  properties: {
    meta: {
      updated_at: string
      units: {
        air_pressure_at_sea_level: string
        air_temperature: string
        air_temperature_max: string
        air_temperature_min: string
        air_temperature_percentile_10: string
        air_temperature_percentile_90: string
        cloud_area_fraction: string
        cloud_area_fraction_high: string
        cloud_area_fraction_low: string
        cloud_area_fraction_medium: string
        dew_point_temperature: string
        fog_area_fraction: string
        precipitation_amount: string
        precipitation_amount_max: string
        precipitation_amount_min: string
        probability_of_precipitation: string
        probability_of_thunder: string
        relative_humidity: string
        ultraviolet_index_clear_sky: string
        wind_from_direction: string
        wind_speed: string
        wind_speed_of_gust: string
        wind_speed_percentile_10: string
        wind_speed_percentile_90: string
      }
    }
    timeseries: Array<ITimeSerie>
  }
}

export interface IAddress {
  latitude: number
  longitude: number
  continent: string
  lookupSource: string
  continentCode: string
  localityLanguageRequested: string
  city: string
  countryName: string
  countryCode: string
  postcode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  plusCode: string
  locality: string
  localityInfo: {
    administrative: Array<{
      name: string
      description: string
      order: number
      adminLevel: number
      isoCode?: string
      wikidataId: string
      geonameId?: number
    }>
    informative: Array<{
      name: string
      description: string
      order: number
      isoCode?: string
      wikidataId?: string
      geonameId?: number
    }>
  }
}

export interface IAppStatus {
  online: boolean
  isFullscreen: boolean
  loading: boolean
  type: 'spinner' | 'placeholder'
}

export interface IWeather {
  city: string
  days: Array<Array<ITimeSerie>> | null
  status: IAppStatus
  error: any
  searchHandler: {
    searchResults: IQuery<IPosition[]>
    searchTerm: string
    onSubmitSearch: (event: any) => void
    onChangeSearchTerm: (event: any) => void
    onSelectSearchResult: (searchResult: IPosition) => void
    openSearch: () => void
    closeSearch: () => void
    resetSearchTerm: () => void
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
  }
  geoPosition: IGeoPosition
}

export interface IGeoPosition {
  error: any
  loading: boolean
}
