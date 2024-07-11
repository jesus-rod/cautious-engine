'use client';

import { loginUser } from '@/app/functions';
import { LoginData } from '@/app/types';
import LoginSVG from '@/components/svgs/LoginSVG';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await loginUser(data);

      if (result?.ok) {
        router.push('/upload');
      } else {
        setServerError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setServerError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Sign in
          </h2>
          {serverError && (
            <div className="mb-4 text-red-500">{serverError}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Log in
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-gray-200 dark:bg-gray-700">
        <div className="w-full h-full">
          <LoginSVG />
        </div>
      </div>
    </div>
  );
};
