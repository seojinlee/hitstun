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
  },

  addCharacter (character) {
    return Admin().post('characters', character)
  },
  addCard (card) {
    return Admin().post('cards', card)
  },
  addStage (stage) {
    return Admin().post('stages', stage)
  },
}
