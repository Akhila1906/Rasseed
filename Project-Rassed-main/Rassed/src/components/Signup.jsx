import { SignUp } from "@clerk/clerk-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/receipt-icon.svg?react";

function Signup() {
  // const navigate = useNavigate();

  return (
    <div className="mt-2 flex min-h-screen flex-col items-center justify-center gap-6">
      {/* <button
        onClick={() => navigate("/")}
        className="mt-4 rounded bg-blue-200 px-4 py-2 text-black transition hover:bg-blue-300"
      >
        Back To Home
      </button> */}
      <Link to="/">
        <div className="flex items-center">
          <Logo className="mr-2 h-10 w-10" />
          <span className="text-4xl font-bold text-gray-800">Rassed</span>
        </div>
      </Link>
      <SignUp signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL} />
    </div>
  );
}

export default Signup;
