import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN' : {
            return { user : action.payload }
        }
        case 'LOGOUT' : {
            return { user : null}
        }
        default : {
            return state ;
        }
    }
}

export const AuthContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer( AuthReducer , {
        user : null
    })

    // we have an issue if we reload the page the state go back to null to to fix it
    //we use USEeFFECT HOOK that simply gona run once the react app rendre will take 
    //the user if there is stored and just update the Authcontext state state

    useEffect(() => {
        // we get the user variable in the storage we parse from json string it into json object so we can use it  
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            dispatch({ type : 'LOGIN' , payload : user})
            
        }
    },[])

    console.log('AuthContext : ' , state);

    return (
        <AuthContext.Provider value={{ ...state , dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


// use ...state instead of state if there is more than one object here i only have user in state so i dont need to do that