import React, { useEffect } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="flex-auto flex flex-col items-center py-10 px-5">
      <div className="text-white flex flex-col gap-10">
        <p className="text-md bg-yellow rounded-lg p-3">
          * To access the site, you must first become a member. If you have a
          membership, fill out your information in the login section and get
          more information. You can then log in to the site.
        </p>
      </div>

      <Form />
    </div>
  );
};

export default Auth;
