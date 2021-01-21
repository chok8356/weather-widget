import axios from 'axios'

const HttpClient = axios.create({
  timeout: process.env.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

HttpClient.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params.appid = process.env.VUE_APP_API_KEY
  return config
})

export {
  HttpClient
}
