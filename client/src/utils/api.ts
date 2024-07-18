import axios from 'axios'

export const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const api = axios.create({
  baseURL: SERVER_URL,
})

export const getAuthorizedApi = (authToken: string) => {
  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      Authorization: `${authToken}`,
    },
  })
}
