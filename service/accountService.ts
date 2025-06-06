import axios from 'axios';
import { SERVER_URL } from '@/constants/Server';


export const LoginRequest = async (username : string , password : string ) => {
  try {
    const response = await axios.post(`${SERVER_URL}/login`, {
      username : username,
      password : password
    })
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const VerifyRequest = async () => {
  try {
    const response = await axios.post(`${SERVER_URL}/vrfy`);
    return (response.data);
  } catch(err) {
    console.log(err);
    return (err);
  }
}

export const RegisterRequest = async (username : string , password : string ) => {
  try {
    const response = await axios.post(`${SERVER_URL}/register`, {
      username : username,
      password : password
    });
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}



export const LogoutRequest = async () => {
  try {
    const response = await axios.post(`${SERVER_URL}/logout`, {

    })
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}
