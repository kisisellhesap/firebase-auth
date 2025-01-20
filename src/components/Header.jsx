import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("currentUser", JSON.stringify(null));
        toast.success("Checked Out");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="bg-white">
      <nav className="flex items-center gap-3 p-4  text-gray font-semibold text-md container mx-auto">
        <NavLink to="/">Intro</NavLink>

        {!user && <NavLink to="auth">Auth</NavLink>}

        {user && (
          <NavLink className="ml-auto" to="profile">
            Profile
          </NavLink>
        )}

        {user && <button onClick={handleOut}>Exit</button>}
      </nav>
    </div>
  );
};

export default Header;
