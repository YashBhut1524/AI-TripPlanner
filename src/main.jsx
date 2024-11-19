import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./pages/createTrip/CreateTrip";
import Header from "./components/custom/Header";
import ThemeContext from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext";
import ThemeIcon from "./components/custom/ThemeIcon";
import UserProfile from "./components/custom/UserProfile";
import { UserProfileProvider } from "./context/UserProfileContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

function MainApp() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <AuthProvider>
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <UserProfileProvider>
            <Header />
            <ThemeIcon />
            <RouterProvider router={router} />
            <UserProfile />
          </UserProfileProvider>
        </ThemeContext.Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
    <Toaster position="top-right" />
  </StrictMode>
);
