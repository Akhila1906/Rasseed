import React, { useContext } from "react";
import Logo from "../assets/receipt-icon.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import UserContextObj from "../contexts/UserContextObj";

function Header() {
  const { isSignedIn, user } = useUser();
  const { setCurrentUser } = useContext(UserContextObj);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <nav className="fixed top-0 right-0 left-0 z-50 flex flex-col items-center justify-between rounded-b-lg bg-white p-4 shadow-sm md:flex-row md:px-8">
        <div className="flex items-center">
          <Logo className="mr-2 h-8 w-8" />
          <span className="text-2xl font-bold text-gray-800">Rassed</span>
        </div>

        <ul className="flex flex-wrap justify-center space-x-4 text-sm text-gray-700 md:flex-row md:space-x-6 md:text-base">
          <li>
            <Link
              to="/"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Upload Receipt
            </Link>
          </li>
          <li>
            <Link
              to="/query"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Query
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Transactions
            </Link>
          </li>
          {/* <li>
            <Link to="/group-spending" className="hover:text-blue-600 font-medium transition duration-300 ease-in-out">Group Spending</Link>
          </li> */}
          <li>
            <Link
              to="/settings"
              className="font-medium transition duration-300 ease-in-out hover:text-blue-600"
            >
              Settings
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          {!isSignedIn ? (
            <>
              <li>
                <Link
                  to="/signin"
                  className="rounded-full bg-gray-300 px-4 py-2 font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-400"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="rounded-full bg-gray-300 px-4 py-2 font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-400"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <div className="flex items-center">
              <img
                src={user.imageUrl}
                className="mr-3 h-12 w-12 rounded-full"
                alt="UserProfile"
              />
              <div className="">
                <button
                  className="rounded-full bg-red-400 px-4 py-2 font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-red-500"
                  onClick={handleSignOut}
                >
                  SignOut
                </button>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
