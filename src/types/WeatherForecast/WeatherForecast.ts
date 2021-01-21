import { IWeatherForecastLocation } from './IWeatherForecastLocation'

export class WeatherForecast {
  cloudiness = 0;
  humidity = 0;
  windSpeed = 0;
  pressure = 0

  temperature = 0;

  description = ''

  location: IWeatherForecastLocation = {
    id: null,
    name: '',
    country: ''
  };

  weatherIcon = 'weather/cloud-day'

  constructor(data: WeatherForecastApi.IRootObject | null = null) {
    if (data) {
      this.setData(data)
    } else {
      console.error('WeatherForecast constructor: Date is required')
    }
  }

  get isDay() {
    const hour = new Date().getHours()
    return !!((hour > 5 && hour < 18))
  }

  /**
   * Assign the data received from the api to this class
   *
   * @param  {WeatherForecastApi.IRootObject} data
   */
  setData(data: WeatherForecastApi.IRootObject) {
    this.cloudiness = data.clouds.all
    this.humidity = data.main.humidity
    this.windSpeed = data.wind.speed
    this.pressure = data.main.pressure
    this.temperature = Math.round(data.main.temp)
    this.description = data.weather[0].description
    this.location.id = data.id
    this.location.name = data.name
    this.location.country = data.sys.country
    this.weatherIcon = this.getWeatherIcon(data.weather[0].id)
  }

  /**
   * Returns the name of the icon depending on the weather
   *
   * @param  {number} id - Weather ID
   */
  getWeatherIcon(id: number) {
    const postfix = this.isDay ? 'day' : 'night'
    let iconName = 'weather/cloud'
    if (this.isThunderstorm(id)) {
      iconName = 'weather/storm'
    }

    if (this.isDrizzle(id) || this.isRain(id)) {
      iconName = 'weather/rain'
    }

    if (this.isSnow(id)) {
      iconName = 'weather/snow'
    }

    if (this.isClear(id)) {
      iconName = 'weather/clear'
    }

    return `${iconName}-${postfix}`
  }

  /**
   * @param  {number} id - Weather ID
   */
  isThunderstorm(id: number) {
    return id >= 200 && id <= 232
  }

  /**
   * @param  {number} id - Weather ID
   */
  isDrizzle(id: number) {
    return id >= 300 && id <= 321
  }

  /**
   * @param  {number} id - Weather ID
   */
  isRain(id: number) {
    return id >= 500 && id < 531
  }

  /**
   * @param  {number} id - Weather ID
   */
  isSnow(id: number) {
    return id >= 600 && id <= 622
  }

  /**
   * @param  {number} id - Weather ID
   */
  isClear(id: number) {
    return id === 800
  }
}
