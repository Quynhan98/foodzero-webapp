// Utils
import {
  cleanup,
  screen,
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@utils/testUtils'

// Mocks
import { BLOG_SECTION_MOCK, OUR_MENU_MOCK } from '@mocks/mockData'

// Constants
import { SNACKBAR_BOOKING_SUCCESS } from '@constants/text'
import { SERVER_ERROR } from '@constants/index'

// Pages
import { Home } from '@pages/index'

describe('Home page', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(),
    }),
  ) as jest.Mock

  const props = { menu: OUR_MENU_MOCK, posts: BLOG_SECTION_MOCK }
  const bookingMock = {
    date: '12/21/2022',
    time: '12:00 am',
    person: '2 Person',
  }

  let wrapper: RenderResult

  beforeEach(() => {
    wrapper = render(<Home {...props} />)
  })

  afterEach(() => {
    cleanup()
  })

  it('Renders Home page correctly', () => {
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('Should call onChange date picker', () => {
    const date = screen.getByPlaceholderText('MM/DD/YYYY')

    fireEvent.change(date, {
      target: { value: bookingMock.date },
    })

    expect(date).toHaveValue(bookingMock.date)
  })

  it('Should onchange time ', () => {
    const time = screen.getByTestId('selectTime')

    fireEvent.change(time, { target: { value: bookingMock.time } })

    expect(time).toHaveValue(bookingMock.time)
  })

  it('Should onchange person ', () => {
    const person = screen.getByTestId('selectPerson')

    fireEvent.change(person, { target: { value: bookingMock.person } })

    expect(person).toHaveValue(bookingMock.person)
  })

  it('Should call submit form booking', () => {
    const button = screen.getByRole('button', { name: /Book Now/i })

    fireEvent.submit(button)

    waitFor(() => {
      expect(screen.getByText(SNACKBAR_BOOKING_SUCCESS)).toBeTruthy()
    })
  })

  it('Should call submit form booking with server error', () => {
    jest.fn().mockImplementationOnce(() => Promise.reject(SERVER_ERROR))

    const button = screen.getByRole('button', { name: /Book Now/i })

    fireEvent.submit(button)

    waitFor(() => {
      expect(screen.getByText(SERVER_ERROR)).toBeTruthy()
    })
  })
})
