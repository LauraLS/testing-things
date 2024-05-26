export default class UserSearcher {
  constructor(value) {
    this.value = value
  }

  find(id) {
    return { id, name: 'foo', value: this.value }
  }
}
