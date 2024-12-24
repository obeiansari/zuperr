import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://Zupper.com/api/v1',
})

const get = async (URL: string) => axiosClient.get(URL).then((response) => response)

const post = async (URL: string, payload: object) => axiosClient.post(URL, payload).then((response) => response)

const patch = async (URL: string, payload: object) => axiosClient.patch(URL, payload).then((response) => response)

const remove = async (URL: string, payload: object) => axiosClient.delete(URL).then((response) => response)

export {
  get,
  post,
  patch,
  remove,
}
