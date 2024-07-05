/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from 'react';


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  mobNumber: string;
  profilePic: File | null;
  password: string;
  confirmPassword: string;
}



export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    dob: '',
    mobNumber: '',
    profilePic: null,
    password: '',
    confirmPassword: ''
  });

  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0]  // Assign the File object directly to profilePic
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.dob || !formData.mobNumber || !formData.password) {
      setFormError('All fields are mandatory');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('first_name', formData.firstName);
    formPayload.append('last_name', formData.lastName);
    formPayload.append('email', formData.email);
    formPayload.append('username', formData.username);
    formPayload.append('date_of_birth', formData.dob);
    formPayload.append('phone_number', formData.mobNumber);
    if (formData.profilePic) {
      formPayload.append('profile_pictures', formData.profilePic);  // Ensure profilePic is appended correctly
    }
    formPayload.append('password', formData.password);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://192.168.154.71:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          // No need to set Content-Type for FormData, it's automatically set
        },
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setFormSuccess('Registration successful');
      setFormError('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        dob: '',
        mobNumber: '',
        profilePic: null,
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setFormError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className='p-6'>
      <div className=" aspect-ratio-2/1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">  <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <center>Registration Form</center>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        autoComplete="username"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="mobNumber" className="block text-sm font-medium leading-6 text-gray-900">
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="mobNumber"
                        name="mobNumber"
                        type="tel"
                        value={formData.mobNumber}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="profilePic" className="block text-sm font-medium leading-6 text-gray-900">
                      Profile Picture
                    </label>
                    <div className="mt-2">
                      <input
                        id="profilePic"
                        name="profilePic"
                        type="file"
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
            {formSuccess && <div className="text-green-500 text-sm mt-2">{formSuccess}</div>}

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  username: '',
                  dob: '',
                  mobNumber: '',
                  profilePic: null,
                  password: '',
                  confirmPassword: ''
                })}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>


    </div>




  )
}
