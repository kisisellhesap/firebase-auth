import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const Intro = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex-1 flex  justify-center px-5 ">
      <div className=" flex flex-col items-center gap-4 text-white shadow-lg container  mt-[10rem]">
        <img src="/logo.png" className="w-52" alt="" />
        <h1 className="text-5xl font-bold mb-10">Firebase & Auth</h1>
        {user ? (
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold  text-2xl">Technologies Used</h3>
              <ul className="flex flex-col gap-1 list-disc">
                <li>Firebase</li>
                <li>React Router Dom</li>
                <li>React Hot Toast</li>
                <li>Tailwind</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold  text-2xl">What did we do?</h3>
              <ul className="flex flex-col gap-1 list-disc">
                <li>Registration and login via email</li>
                <li>Update profile information</li>
                <li>
                  Secure transition between pages via router using user
                  information in firebase
                </li>
                <li>Notifying users with hot toast</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-md">
              - Firebase is a mobile and web application provided by Google It
              is a platform that facilitates development processes. a series By
              offering integrated tools and services, application development,
              data management, analysis and user interactions faster and more
              effectively It allows you to manage it in a way.
            </p>
            <br />
            <p className="text-md">
              - Come on, click on the
              <Link
                to="auth"
                className="px-2 py-[2px] bg-white text-red mx-2 font-bold rounded-sm"
              >
                Auth
              </Link>
              section to try it!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
