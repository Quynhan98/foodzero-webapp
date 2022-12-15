import React from 'react'
import Router from 'next/router'

// Utils
import { cleanup, fireEvent, render, screen, waitFor } from '@utils/testUtils'
import { NextRouterProvider } from '@utils/nextRouterProvider'

// Pages
import LoginPage from '@pages/login'

// Constants
import {
  EMAIL_NOT_EXIST,
  INVALID_PASSWORD,
  PAGE_URL,
  SERVER_ERROR,
} from '@constants/index'

// Mocks
import { USERS_MOCK } from '@mocks/mockData'

describe('Login Page', () => {
  const accountMock = {
    email: 'foodzero@gmail.com',
    password: '123456789',
  }

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(USERS_MOCK),
    }),
  ) as jest.Mock

  beforeEach(() => {
    cleanup()
    render(
      <NextRouterProvider router={{ pathname: PAGE_URL.LOGIN.URL }}>
        <LoginPage />
      </NextRouterProvider>,
    )
  })

  it('Login Page matches snapshot', () => {
    const { container } = render(
      <NextRouterProvider router={{ pathname: PAGE_URL.LOGIN.URL }}>
        <LoginPage />
      </NextRouterProvider>,
    )

    expect(container).toMatchSnapshot()
  })

  it('Should call onChange input email', () => {
    const email = screen.getByTestId('email')

    fireEvent.change(email, {
      target: { value: accountMock.email },
    })

    expect(email).toHaveValue(accountMock.email)
  })

  it('Should call onChange input password', () => {
    const password = screen.getByTestId('password')

    fireEvent.change(password, {
      target: { value: accountMock.password },
    })

    expect(password).toHaveValue(accountMock.password)
  })

  it('Should call submit form', () => {
    const email = screen.getByTestId('email')
    fireEvent.change(email, {
      target: { value: accountMock.email },
    })

    const password = screen.getByTestId('password')
    fireEvent.change(password, {
      target: { value: accountMock.password },
    })

    const button = screen.getByRole('button', {
      name: /sign in/i,
    })

    fireEvent.submit(button)

    waitFor(() => {
      expect(Router.push).toHaveBeenCalledWith(PAGE_URL.HOME)
    })
  })

  it('Should call submit form error', () => {
    const email = screen.getByTestId('email')
    fireEvent.change(email, {
      target: { value: 'notemail@gmail.com' },
    })

    const password = screen.getByTestId('password')
    fireEvent.change(password, {
      target: { value: accountMock.password },
    })

    const button = screen.getByRole('button', {
      name: /sign in/i,
    })
    fireEvent.submit(button)

    waitFor(() => {
      expect(screen.getByText(EMAIL_NOT_EXIST)).toBeTruthy()
      expect(screen.getByText(INVALID_PASSWORD)).toBeTruthy()
    })
  })

  it('Should call submit form with server error', () => {
    jest.fn().mockImplementationOnce(() => Promise.reject(SERVER_ERROR))

    const email = screen.getByTestId('email')
    fireEvent.change(email, {
      target: { value: accountMock.email },
    })

    const password = screen.getByTestId('password')
    fireEvent.change(password, {
      target: { value: accountMock.password },
    })

    const button = screen.getByRole('button', {
      name: /sign in/i,
    })

    fireEvent.submit(button)

    waitFor(() => {
      expect(screen.getByText(SERVER_ERROR)).toBeTruthy()
    })
  })
})
