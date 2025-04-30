import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import SettingPage from "./Pages/SettingPage"
import RegisterPage from "./Pages/RegisterPage"
import LoginPage from "./Pages/LoginPage"
import ProfilePage from "./Pages/ProfilePage"
import useAuthCheck from "./store/useAuthCheck"
import { Toaster } from 'react-hot-toast';


const App : React.FC = () => {

    let { userAuth, isCheckingAuth, checkAuth,onlineUsers } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

   if (isCheckingAuth && !userAuth) {
    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
}

    return (<>
        <BrowserRouter>
		<Routes>
      <Route
        path="/"
        element={userAuth ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/setting"
        element={userAuth ? <SettingPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/register"
        element={!userAuth ? <RegisterPage /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!userAuth ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={userAuth ? <ProfilePage /> : <Navigate to="/login" />}
      />
    </Routes>
	</BrowserRouter>
  <Toaster/>
  </>
    );
}

export default App;