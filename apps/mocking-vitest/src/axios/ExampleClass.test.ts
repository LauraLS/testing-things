import axios from 'axios'
import ExampleClass from './ExampleClass'

describe('ExampleClass', () => {
  const exampleClass = new ExampleClass()

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('Should mock axios get', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { success: true } })

    const response = await exampleClass.requestGet('123')

    expect(axios.get).toHaveBeenCalledWith('123')
    expect(response).toEqual({ success: true })
  })
  it('Should mock axios get 2', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { success: false } })

    const response = await exampleClass.requestGet('222')

    expect(axios.get).toHaveBeenCalledWith('222')
    expect(response).toEqual({ success: false })
  })
})
