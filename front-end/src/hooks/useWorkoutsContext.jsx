import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const UseWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used unside a WorkoutsContextProvider!')
    }

    return context ;
}