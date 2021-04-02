import Api from '@/services/Api'

export default {
  createGame (data) {
    return Api().post('createGame', data)
  },
  getRoom () {
    return Api().get('room')
  },
  getCharacters () {
    return Api().get('characters')
  },
  getStages () {
    return Api().get('stages')
  }
}
