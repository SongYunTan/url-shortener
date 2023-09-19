import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import mockAxios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Signup from '../pages/Signup/Signup';

const MockSignup = () => {
  return (
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

afterAll(() => {
  mockAxios.reset();
  cleanup();
});

describe('Signup Page Component Testing', () => {
  test('Should render correctly', () => {
    render(<MockSignup />);

    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(screen.findByRole('button', /sign up/i)).toBeTruthy();
    expect(screen.findByRole('link', /back to login/i)).toBeTruthy();
  });

  test('Should render input elements correctly', async () => {
    render(<MockSignup />);

    const username = 'admin';
    const pass1 = 'hello';
    const pass2 = 'hello';

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: username } });
    expect(usernameInput.value).toBe(username);
    fireEvent.change(passwordInput, { target: { value: pass1 } });
    expect(passwordInput.value).toBe(pass1);
    fireEvent.change(password2Input, { target: { value: pass2 } });
    expect(password2Input.value).toBe(pass2);
  });

  test('Should not show error when passwords are same', () => {
    render(<MockSignup />);

    const username = 'admin';
    const pass1 = 'hello';

    userEvent.type(screen.getByPlaceholderText('Username'), username);
    userEvent.type(screen.getByPlaceholderText('Password'), pass1);
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), pass1);

    expect(
      getByText('The new password that you entered do not match!')
    ).not.toBeInTheDocument();
  });

  test('Should show error when passwords are different', () => {
    render(<MockSignup />);

    const username = 'admin';
    const pass1 = 'hello';
    const pass2 = 'hi';

    userEvent.type(screen.getByPlaceholderText('Username'), username);
    userEvent.type(screen.getByPlaceholderText('Password'), pass1);
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), pass2);

    expect(
      getByText('The new password that you entered do not match!')
    ).toBeInTheDocument();
  });

  test('Should call signup endpoint', async () => {
    const history = createMemoryHistory({ initialEntries: ['/signup'] });

    render(
      <BrowserRouter location={history.location} navigator={history}>
        <Signup />
      </BrowserRouter>
    );

    expect(history.location.pathname).toBe('/signUp');

    const header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const username = 'admin';
    const pass1 = 'hello';
    const pass2 = 'hello';

    mockAxios.post.mockResolvedValueOnce({
      data: { id: 1, username: 'admin' },
      status: 200,
    });

    await waitFor(() => {
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const password2Input = screen.getByPlaceholderText('Confirm Password');
      const buttonElement = screen.getByRole('button', {
        name: /SIGN UP/i,
      });

      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: pass1 } });
      fireEvent.change(password2Input, { target: { value: pass2 } });
      fireEvent.click(buttonElement);
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'https://baby-url-backend-7b27c2fd1375.herokuapp.com/signup',
      { password: pass1, username: username },
      { headers: header }
    );
  });
});
