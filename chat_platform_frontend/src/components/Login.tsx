import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    const response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type here
      },
      body: JSON.stringify({ username, password }),
    });


    const data = await response.json();

    if (response.ok) {

      localStorage.setItem('token', data.access);

      storeUserDataInLocalStorage(localStorage.getItem('token'));


      navigate('/chat');
    } else {
      alert(data.detail);
    }
  };

  const getUserData = async (token: string | null) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };


  const storeUserDataInLocalStorage = async (token: string | null) => {
    try {
      const userData = await getUserData(token);
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data stored in local storage:', userData);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error storing user data in local storage:', error);
    }
  };

  // Usage example (assuming you have a JWT token stored somewhere)


  return (
    <div style={{ margin: "20vh 0" }}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in into your Account..
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  // autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="text-sm">
              <a href="register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}
