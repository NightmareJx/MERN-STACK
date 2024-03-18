import { useState } from "react";
import { UseSignup } from "../hooks/useSignup";


export default function Signup () {
    const [username,SetUsername] = useState("");
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const { signup , isLoading , error } = UseSignup()

    const HandleSignup = async (e) => {
        e.preventDefault();
        // we used the signup logic in a hook and we just called it here
        await signup(username,email,password);
    }


    return (
        <form className="signup" onSubmit={HandleSignup}>
            <h3>Sign Up</h3>
            <label>Username</label>
            <input type="text" onChange={(e) => {SetUsername(e.target.value)}} value={username}/>
            <label>Email</label>
            <input type="email" onChange={(e) => {SetEmail(e.target.value)}} value={email}/>
            <label>Password</label>
            <input type="password" onChange={(e) => {SetPassword(e.target.value)}} value={password}/>
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}