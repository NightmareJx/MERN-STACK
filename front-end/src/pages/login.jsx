import { useState } from "react";
import { UseLogin } from "../hooks/useLogin";


export default function Login () {
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const { login , isLoading , error } = UseLogin()

    const HandleLogin = async (e) => {
        e.preventDefault();

        await login(email,password)
    }


    return (
        <form className="login" onSubmit={HandleLogin}>
            <h3>Login</h3>
            <label>Email</label>
            <input type="email" onChange={(e) => {SetEmail(e.target.value)}} value={email}/>
            <label>Password</label>
            <input type="password" onChange={(e) => {SetPassword(e.target.value)}} value={password}/>
            <button disabled={isLoading}>Login Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}