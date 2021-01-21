declare namespace WeatherForecastApi {

  export interface ICoord {
    lon: number;
    lat: number;
  }

  export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }

  export interface IWind {
    speed: number;
    deg: number;
  }

  export interface IClouds {
    all: number;
  }

  export interface ISys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  export interface IRootObject {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
}
