import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Logo from "../assets/receipt-icon.svg?react";

function Signin() {
  return (
    <div className="mt-2 flex min-h-screen flex-col items-center justify-center gap-6">
      <Link to="/">
        <div className="flex items-center">
          <Logo className="mr-2 h-10 w-10" />
          <span className="text-4xl font-bold text-gray-800">Rassed</span>
        </div>
      </Link>
      <SignIn signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL} />
    </div>
  );
}

export default Signin;
