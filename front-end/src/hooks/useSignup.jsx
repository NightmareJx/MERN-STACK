import { UseAuthContext } from "./useAuthContext";
import {  useState } from "react";

export const UseSignup = () => {
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);
    const { dispatch } = UseAuthContext()

    const signup = async (username , email,password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup' , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'} , 
            body : JSON.stringify({username ,email , password})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        };
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user' , JSON.stringify(json));
            dispatch({type : 'LOGIN' , payload : json});
            setIsLoading(false);
        }   
    }  
    
    return { signup , isLoading , error } 
}