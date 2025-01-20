import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [IsSignIn, setIsSignIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IsSignIn) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Registration successful, you can log in");
          signOut(auth);
          setIsSignIn(false);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
          setIsSignIn(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          localStorage.setItem("currentUser", JSON.stringify(auth.currentUser));
          toast.success("Logged in");
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex gap-3 mb-10">
            <button
              className={
                IsSignIn
                  ? "font-bold text-white px-3 py-1 rounded-md w-[50%]"
                  : "bg-red text-white font-bold px-3 py-1 rounded-md  w-[50%]"
              }
              onClick={() => setIsSignIn(false)}
            >
              Login
            </button>
            <button
              className={
                IsSignIn
                  ? "bg-red text-white font-bold px-3 py-1 rounded-md w-[50%]"
                  : "font-bold text-white px-3 py-1 rounded-md w-[50%]"
              }
              onClick={() => setIsSignIn(true)}
            >
              Sign up
            </button>
          </div>
          <img className="mx-auto h-20 w-auto" src="/logo.png" alt="firebase" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            {IsSignIn
              ? "Are you ready to become our new member?"
              : "If you already have an account then what are you waiting for?"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  Password
                </label>

                {!IsSignIn && (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-white hover:text-[#fff]/80"
                      onClick={() => {
                        toast.error(
                          "Sorry :/ I am tired, maybe next project..."
                        );
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              >
                {IsSignIn ? "Kayıt Ol" : "Giriş Yap"}
              </button>
            </div>
          </form>

          {!IsSignIn && (
            <p className="mt-10 text-center text-sm/6 text-white flex justify-center gap-2">
              <span>Not a member ?</span>
              <button
                className="font-semibold text-yellow"
                onClick={() => setIsSignIn(true)}
              >
                Register Now
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
