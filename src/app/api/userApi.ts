import { SignupFormData } from '@/constants';
import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:4000', // Backend base URL
  baseURL: "https://payment-reminder-backend-2.onrender.com"// Backend base URL
});

// Signup
export const signupUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  // const res = await fetch("http://localhost:4000/users/signup", {
  const res = await fetch("https://payment-reminder-backend-2.onrender.com/users/signup", {
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
  // const res = await API.post('http://localhost:4000/users/signin', formData);
  const res = await API.post('https://payment-reminder-backend-2.onrender.com/users/signin', formData);
  return res.data;
};
