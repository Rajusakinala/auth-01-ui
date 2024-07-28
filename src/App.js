// tasks
// refresh tokrn expires, navigate('/login')

import "./App.css";
import { useState, useEffect } from "react";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import Dashboard from "./layout/Dashboard";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DetailsForm from "./pages/DetailsForm";
import Posts from "./pages/Posts";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoutes from "./auth/pages/PrivateRoutes";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./auth/pages/ForgetPassword";
import { UserContext, userObj } from "./auth/context/UserContext";

function App() {
  const [user, setUser] = useState();

  function fetchUser() {
    let userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromLocalStorage) {
      // console.log("@@userFromLocalStorage", userFromLocalStorage);
      setUser(userFromLocalStorage);
    } else {
      setUser();
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        {/* {console.log("@@user", user)} */}
        {user && <Dashboard user={user} fetchUser={() => fetchUser()} />}
        <div style={{ margin: "16px" }}>
          <Routes>
            {/* // Public Route */}
            {!user && (
              <>
                <Route
                  path="/login"
                  element={<Login fetchUser={() => fetchUser()} />}
                />
                <Route
                  path="/"
                  element={<Login fetchUser={() => fetchUser()} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgetPassword />} />
                {/* <Route path="*" element={<Navigate to={"/login"} />} /> */}
                <Route
                  path="*"
                  element={<Login fetchUser={() => fetchUser()} />}
                />
                {/* <Route
              path="*"
              element={
                <div>
                  <center>Invalid Url</center>
                </div>
              }
            /> */}
              </>
            )}
            {user && (
              <>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/profile"
                  element={<Profile fetchUser={() => fetchUser()} />}
                />
                <Route path="/detailsForm" element={<DetailsForm />} />
                <Route path="/posts" element={<Posts />} />
                <Route
                  path="*"
                  element={
                    <div>
                      <center>Invalid URL</center>
                    </div>
                  }
                />
              </>
            )}

            {/* // Private Route */}
            {/* <Route
          path="/login"
          element={<Login fetchUser={() => fetchUser()} />}
        />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes user={user} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailsEntryForm" element={<DetailsEntryForm />} />
          <Route path="/posts" element={<Posts />} />
        </Route> */}
            {/* {user && (
          <>
            <Route
              path="/"
              element={<Dashboard user={user} fetchUser={() => fetchUser()} />}
            >
              <Route path="profile" element={<Profile />} />
              <Route path="detailsEntryForm" element={<DetailsEntryForm />} />
              <Route path="posts" element={<Posts user={user} />} />
            </Route>
          </>
        )} */}
            {/* <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} /> */}
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
