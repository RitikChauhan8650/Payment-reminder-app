import { SignupFormData } from '@/constants';
import { api } from '@/lib/api';
import axios from 'axios';

// Signup
export const signupUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  return api.post('/users/signup', userData);
};

// Signin
export const signinUser = async (formData: any) => {
  const res = await api.post('/users/signin', formData);
  return res.data;
};
