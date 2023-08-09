import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";
import {toast} from 'react-hot-toast'
import { setLoading } from "../redux/slices/authSlice";
import { setToken } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/profileSlice";


const{ SIGNUP_API, LOGIN_API, SAVEPOST_API, GET_SAVED_NEWS_API } = endpoints

export function signUp(name , email , password, confirmPassword, navigate) {
    
    return async(dispatch) => {
        const toastId = toast.loading('Loading...', {
            id: 'loading',
          });
         
          dispatch(setLoading(true))
          try{
            const response = await apiConnector("POST",SIGNUP_API, {
               name,
               email,
               password,
               confirmPassword,
            });

            console.log("signup api response....", response);

            
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
            


        } catch(error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            
          }

          dispatch(setLoading(false))
          toast.dismiss(toastId)
    }
}

//login api

export function login(email, password, navigate) {
    return async(dispatch) => {

        const toastId = toast.loading('Loading...', {
            id: 'loading',
          });
            dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });
            

            console.log("login api response...", response)

            if (!response.data.success) {
              throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/");

        } catch(error) {
            console.log("login api error....", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  

export function saveNews(title,description,published,url,image,token) {
   
    return async() => {
       
        const toastId = toast.loading('Loading...', {
            id: 'loading',
          });

        try{
           
            const response = await apiConnector("PUT",SAVEPOST_API,{
                title,
                description,
                published,
                url,
                image,
            },
            {
              Authorization: `Bearer ${token}`,
            });
    
            console.log("Save news api response...", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
              }

              toast.success("Saved successfully")

        } catch(error) {
            console.log("Error in saveNews api call" ,error)
            toast.error("Could not Save")
        }
        toast.dismiss(toastId)
    }
}

export const getSavedNews = async(token) => {
   
     let result = [];
      const toastId = toast.loading('Loading...', {
          id: 'loading',
        });

      try{
         
          const response = await apiConnector("GET",GET_SAVED_NEWS_API,null,
          {
            Authorization: `Bearer ${token}`,
          });

          result = response?.data;
  
          console.log("get saved news api response...", response)

          if (!response.data.success) {
              throw new Error(response.data.message)
            }

      } catch(error) {
          console.log("Error in get saveNews api call" ,error)
          toast.error("Error in fetching")
      }
      toast.dismiss(toastId)
      return result;
}