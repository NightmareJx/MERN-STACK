import { useState } from "react"
import { UseWorkoutContext } from "../hooks/useWorkoutsContext"
import { UseAuthContext } from "../hooks/useAuthContext"; 

export default function WorkoutForm () {
    //the costume hook so we can change the state of the app
    const { dispatch } = UseWorkoutContext()
    const { user } = UseAuthContext()
    // intiliasing the variables
    const [Title , SetTitle] = useState("");
    const [Load , SetLoad] = useState("");
    const [Reps , SetReps] = useState("");
    const [error , SetError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // Handling the submite form
    const HandleSubmit = async (e) => {
        // will prevent the page reload
        e.preventDefault()
        if(!user) {
            SetError('You must be logged in')
            return
        }

        // taking the variables back
        const workout = {title : Title,load : Load,reps :Reps};
        // posting the data 
        const response = await fetch("/api/workouts" , {
            method : 'POST', 
            body : JSON.stringify(workout),
            headers : {
                'Content-Type' : 'application/json' , 
                'Authorization' : `Bearer ${user.token}` ,
            }
        }) ; 

        const json = await response.json();

        if (!response.ok) {
            SetError(json.error);
            setEmptyFields(json.emptyFields)
            console.log(error)
        }
        if(response.ok) {
            SetTitle("");
            SetLoad("");
            SetReps("");
            SetError(null);
            setEmptyFields([])
            console.log('new workout added : ' , json)
            dispatch({type : 'CREATE_WORKOUT' , payload : json})
        }
    }

    return (
        <form className="create" onSubmit={HandleSubmit}>
            <h3>Add New Workout</h3>
            <label>Exercice Title : </label>
            <input 
                type="text" 
                onChange={(e) => {SetTitle(e.target.value)}}
                value={Title}
                className={emptyFields.includes('title') ? 'error' : ''}
                />
            <label>Load (in KG) : </label>
            <input 
                type="number" 
                onChange={(e) => {SetLoad(e.target.value)}}
                value={Load}
                className={emptyFields.includes('load') ? 'error' : ''}
                min={0}
                />
            <label>Reps : </label>
            <input 
                type="number" 
                onChange={(e) => {SetReps(e.target.value)}}
                value={Reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
                min={1}
                />
                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
        </form>
    )
}