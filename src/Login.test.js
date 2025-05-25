import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Login from './Login'
import LoginService from './services/Auth'

test('Login komponentti renderöityy oikein', () => {
    
    render(<Login />)

    const loginHeader = screen.getByRole('heading', { name: 'Login' })
    expect(loginHeader).toBeDefined()

    const username = screen.getByPlaceholderText('Username')
    expect(username).toBeDefined()

    const password = screen.getByPlaceholderText('Password')
    expect(password).toBeDefined()

    const loginButton = screen.getByDisplayValue('Login')
    expect(loginButton).toBeDefined()

    const emptyButton = screen.getByDisplayValue('Empty')
    expect(emptyButton).toBeDefined()

  })

jest.mock('./services/Auth')

test('Kirjautuminen onnistuu status-koodilla 200 ja username sekä accesslevelid täsmäävät', async () => {
  // Onnistunut vastaus authenticate funktiolta
  LoginService.authenticate.mockResolvedValue({
    status: 200,
    data: {
      username: 'tomi',
      accesslevelId: 2,
    },
  })

  // Callback-funktiot
  const setShowMessage = jest.fn()
  const setIsPositive = jest.fn()
  const setMessage = jest.fn()
  const setLoggedInUser = jest.fn()
  const setAccess = jest.fn()

  render(
    <Login
      setShowMessage={setShowMessage}
      setIsPositive={setIsPositive}
      setMessage={setMessage}
      setLoggedInUser={setLoggedInUser}
      setAccess={setAccess}
    />
  )

  // Syötetään käyttäjätunnus, salasana ja painetaan login-painiketta 
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'tomi' },
  })
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'testaaja' },
  })
  fireEvent.click(screen.getByDisplayValue('Login'))

  // Odotetaan suoritus
  await waitFor(() => {
    expect(LoginService.authenticate).toHaveBeenCalled()
    expect(LoginService.authenticate).toHaveBeenCalledWith({
      username: 'tomi',
      password: expect.any(String), // md5
    })

    // Callback-funktioiden kutsut
    expect(setLoggedInUser).toHaveBeenCalledWith('tomi')
    expect(setAccess).toHaveBeenCalledWith(2)
    expect(setMessage).toHaveBeenCalledWith('Logged in as: tomi')
    expect(setIsPositive).toHaveBeenCalledWith(true)
    expect(setShowMessage).toHaveBeenCalledWith(true)
  })
})
