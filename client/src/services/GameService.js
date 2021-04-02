import Api from '@/services/Api'

export default {
  getRoom (ref) {
    return Api().get(`room/${ref}`)
  },
  getCharacter (ref) {
    return Api().get(`characters/${ref}`)
  },
  getStage (ref) {
    return Api().get(`stages/${ref}`)
  }
}
