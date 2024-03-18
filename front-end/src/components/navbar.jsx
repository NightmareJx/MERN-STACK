import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { UseAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const logout = useLogout();
  const { user } = UseAuthContext();

  const HandleClick = () => {
    logout();
  };


  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={HandleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
