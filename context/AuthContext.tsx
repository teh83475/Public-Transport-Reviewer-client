import axios from 'axios';
import { secure_store_authToken, SERVER_URL } from "@/constants/Server";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { LoginRequest, LogoutRequest, RegisterRequest, VerifyRequest } from "@/service/accountService";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from '@/service/redux/profileSlice';


interface AuthProps {
  authState?: { 
    token: string | undefined;
    logged_in: boolean | undefined;
  },
  register?: (username: string, password: string)=> any,
  login?: (username: string, password: string)=> any,
  logout?: ()=> any,
}

const TOKEN_KEY = "session_token"
const AuthContext = createContext<AuthProps>({})









export const useAuth = ()=>{
  return useContext(AuthContext)
}


export const AuthProvider = ({children}:any)=>{
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const [authState, setAuthState] = useState<{ 
    token: string | undefined;
    logged_in: boolean | undefined;
  }>({
    token: undefined,
    logged_in: false,
  })

  useEffect(()=>{
    const loadToken = async ()=>{
      const token= await SecureStore.getItemAsync(secure_store_authToken);
      console.log("token:",token);

      if (token === null) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const vrfyResult = await VerifyRequest();
      console.log("verication result:", vrfyResult.status); 
      if (vrfyResult.status!="SUCCESS") {
        console.log("Verification Failed");
        //remove all profile state
        axios.defaults.headers.common['Authorization'] = ``
        dispatch(setProfile({
          uuid: "",
          username: "",
          reviews          : [],
          upvotedReviews   : [],
          downvotedReviews : [],
          comments: [],
        }));
        return;
      }
      console.log("Verification Success, Automatically logged in now!");
      dispatch(setProfile(vrfyResult.userProfile));
      setAuthState({
        token: token,
        logged_in: true,
      });
      
    }

    loadToken();
  },[])

  const register = async (username: string, password: string)=> {
    try {
      const response = await RegisterRequest(username, password);
      console.log(response);
      return (response);
    } catch(err) {
      console.log(err);
      return (err);
    }
  }

  const login = async (username: string, password: string)=> {
    try {
      const response = await LoginRequest(username, password);
      console.log(response);
      if (response.status!="SUCCESS"){
        return (response);
      }

      setAuthState({
        token: response.token,
        logged_in: true,
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`

      await SecureStore.setItemAsync(secure_store_authToken, response.token)
      
      return (response);
    } catch(err) {
      console.log(err);
      return (err)
    }
  }

  const logout = async ()=> {
    const response = await LogoutRequest();
    console.log(response)
    await SecureStore.deleteItemAsync(secure_store_authToken)

    axios.defaults.headers.common['Authorization'] = ``

    dispatch(setProfile({
      uuid: "",
      username: "",
      reviews          : [],
      upvotedReviews   : [],
      downvotedReviews : [],
      comments: [],
    }));

    setAuthState({
      token: undefined,
      logged_in: false,
    })

    return

  }


  const value = {
    authState: authState,
    register: register,
    login: login,
    logout: logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}