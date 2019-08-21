import axios from 'axios'

const backendHost = process.env.BACKEND_HOST

export function apiGetFolders () {
  return axios.get(backendHost + '/api/folders', { withCredentials: true })
    .then(res => {
      return res.data.data.map(val => {
        return {
          text: val,
          value: val
        }
      })
    })
}

export function apiGetPictures (folder) {
  return axios.get(backendHost + `/api/pictures?folder=${folder}`, { withCredentials: true })
    .then(res => res.data.data)
}

export function apiLogin (user) {
  localStorage.removeItem('user')
  return axios.post(backendHost + '/api/sessions', { user }, { withCredentials: true })
    .then(res => {
      if (res.status !== 200 || res.data.errors) {
        return false
      }
      localStorage.setItem('user', JSON.stringify(res.data))
      return true
    })
}
