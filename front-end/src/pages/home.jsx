import { useEffect } from "react";
import WorkoutDetail from "../components/workoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutContext } from "../hooks/useWorkoutsContext";
import { UseAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = UseWorkoutContext();
  const { user } = UseAuthContext();

  // fetching data from the backend api
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // this && is a condition wich means will see if there is workout if there is it will map

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetail key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}
