import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
// import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  // when the page first mounts it'll load maybe to take info from appwrite so we can display a loading icon
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         // console.log("userData", userData);
  //         dispatch(login(userData));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className="w-full block">
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
