import Admin from '@/services/Admin'

export default {
  getCharacters () {
    return Admin().get('characters')
  },
  getCards () {
    return Admin().get('cards')
  },
  getStages () {
    return Admin().get('stages')
  }
}
