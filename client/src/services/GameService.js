import Api from '@/services/Api'
import axios from 'axios'

export default {
  getRoom (ref) {
    return axios.get(`/api/room/${ref}`)
  },
  getCharacter (ref) {
    return Api().get(`characters/${ref}`)
  },
  getStage (ref) {
    return Api().get(`stages/${ref}`)
  }
}
