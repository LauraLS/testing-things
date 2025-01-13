import ExampleClass from './ExampleClass'

const mocks = vi.hoisted(() => {
  return {
    get: vi.fn(),
  }
})

vi.mock('axios', () => {
  return {
    default: { ...mocks },
  }
})

describe('ExampleClass mock', () => {
  const exampleClass = new ExampleClass()

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('Should mock axios get', async () => {
    mocks.get.mockResolvedValue({ data: { success: true } })

    const response = await exampleClass.requestGet('123')

    expect(mocks.get).toHaveBeenCalledWith('123')
    expect(response).toEqual({ success: true })
  })
  it('Should mock axios get 2', async () => {
    mocks.get.mockResolvedValue({ data: { success: false } })

    const response = await exampleClass.requestGet('222')

    expect(mocks.get).toHaveBeenCalledWith('222')
    expect(response).toEqual({ success: false })
  })
})
