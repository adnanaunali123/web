import React from "react";
import { removeCookie } from "@/utils/storage.util";
import Router from "next/router";
import { useAppSelector } from "@/redux/store";

const NavBar = () => {
  const user = useAppSelector((state) => state.authenticationSlice.user);
  console.log({ user });

  const handleLogout = () => {
    try {
      removeCookie("accessToken");
      Router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">ABC</span>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm font-semibold text-gray-800">
              <label htmlFor="">{user?.username}</label>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray-800"
            >
              Log out
            </button>
          </div>

          <div className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
