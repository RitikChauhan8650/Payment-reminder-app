import { SignupFormData } from '@/constants';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // Backend base URL
});

// Signup
export const signupUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await fetch("http://localhost:3001/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
};

// Signin
export const signinUser = async (formData: any) => {
  const res = await API.post('http://localhost:3001/users/signin', formData);
  return res.data;
};
