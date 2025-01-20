import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(() => {
    return JSON.parse(localStorage.getItem("isCreate")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isCreate", JSON.stringify(isCreate));
  }, [isCreate]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!img.startsWith("https://")) {
      toast.error("Please enter the image URL in correct format");
      setImg("");
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Your Profile is being Edited...");

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img,
    })
      .then(() => {
        localStorage.setItem("currentUser", JSON.stringify(auth.currentUser));
        toast.success("Your Profile Edited");
        toast.dismiss(toastId);

        setName("");
        setImg("");
        setLoading(false);
        setIsCreate(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex-auto flex flex-col items-center px-5 ">
      <div className="flex flex-col gap-5 mt-[10rem] ">
        <h1 className="text-5xl font-bold mb-10 text-center text-white  ">
          {isCreate
            ? "Edit your profile information"
            : "Your Current Profile Information"}
        </h1>
        {isCreate ? (
          <div
            className="p-3 rounded-lg flex flex-col items-center gap-4 h-full 
"
          >
            <img
              className="mx-auto h-20 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <form className="space-y-6 w-full" onSubmit={handleCreate}>
              <div>
                <label className="block text-sm/6 font-medium text-white">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow sm:text-sm/6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-white flex w-full">
                    <span>Avatar</span>
                    <span className="text-[#fff]/40 ml-auto">
                      https://picsum.photos/200/300
                    </span>
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow sm:text-sm/6"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    placeholder="https://"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
                >
                  {loading ? "Wait " : "Edit"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div
            className="bg-white mx-3 p-5 rounded-md flex gap-5 items-center 
"
          >
            {user.photoURL !==
              ""(
                <img src={user.photoURL} className="rounded-full w-24 h-24" />
              )}

            {user.displayName !==
            (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-xl">Name</span>
                <h3 className="font-bold text-xl">{user.displayName}</h3>
              </div>
            )}

            <button
              className="ml-auto flex  justify-center rounded-md bg-red px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              onClick={() => {
                setIsCreate(true);
                setName(user.displayName);
                setImg(user.photoURL);
              }}
            >
              Edit your profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
