import axios from 'axios'

export default class ExampleClass {
  async requestGet(url: string) {
    const response = await axios.get(url)
    const { data } = response

    return data
  }
}
