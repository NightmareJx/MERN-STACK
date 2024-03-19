import { UseWorkoutContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { UseAuthContext } from "../hooks/useAuthContext";

export default function WorkoutDetail({ workout }) {
  const { user } = UseAuthContext();
  const { dispatch } = UseWorkoutContext();

  const HandleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (KG) : </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (KG) : </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={HandleClick}>
        <img src="/bin.png" alt="delete" />
      </span>
    </div>
  );
}
