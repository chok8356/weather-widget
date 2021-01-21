import { HttpClient } from './HttpClient'

export class WeatherForecastClient {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/';
  /**
   * Get Weather forecast by geolocation position
   *
   * @param  {GeolocationPosition} position
   * @returns Promise
   */
  async getDataByPosition(position: GeolocationPosition): Promise<WeatherForecastApi.IRootObject | undefined> {
    try {
      const { data } = await HttpClient.get(`${this.apiUrl}weather`, {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          units: 'metric'
        }
      })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Get Weather forecasts list by cities names
   *
   * @param  {string} q - Cities names
   * @returns Promise
   */
  async getDataListByQuery(q: string): Promise<WeatherForecastApi.IRootObject[] | undefined> {
    try {
      const { data } = await HttpClient.get(`${this.apiUrl}find`, {
        params: {
          q: q,
          type: 'like',
          sort: 'population',
          cnt: 10,
          units: 'metric'
        }
      })
      if (data.cod === '200') {
        return data.list
      } else {
        return []
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Get Weather forecasts list by cities ids
   *
   * @param  {string} ids - Cities ids {id,..,id}
   * @returns Promise
   */
  async getDataListByIds(ids: string): Promise<WeatherForecastApi.IRootObject[] | undefined> {
    try {
      const { data } = await HttpClient.get(`${this.apiUrl}group`, {
        params: {
          id: ids,
          units: 'metric'
        }
      })
      return data?.list || []
    } catch (error) {
      console.error(error)
    }
  }
}
