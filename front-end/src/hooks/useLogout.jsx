import { UseAuthContext } from "./useAuthContext";
import { UseWorkoutContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = UseAuthContext();
    // we usee dispatch : name bc we have the same names 
    const { dispatch :  workoutdispatch } = UseWorkoutContext()

    const logout = () => {

        //remove the token from the local storage
        localStorage.removeItem('user');

        // dispatch the logout 
        dispatch({type : 'LOGOUT' })

        // reset the workouts state 
        workoutdispatch({type : 'SET_WORKOUT' , payload : null}) 


    }

    return logout ; 
}