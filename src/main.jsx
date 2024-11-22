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
import UserProfile from "./components/custom/UserProfile";
import { UserProfileProvider } from "./context/UserProfileContext";
import ViewTrip from "./pages/viewTrip/ViewTrip";
import ThemeIcon from "./components/custom/ThemeIcon";
import Footer from "./components/custom/Footer";
import MyTrips from "./pages/MyTrips/MyTrips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />
  },
  {
    path: "/my-trips",
    element: <MyTrips />
  }
], {
  future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
  },
});

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
            <div className={`px-6 ${darkMode ? "bg-[#0d0d1a] text-white" : "bg-[#f9f9f9] text-gray-800"}`}>
              <ThemeIcon />
            </div>
            <RouterProvider router={router} />
            <UserProfile />
            {/* Footer */}
            <Footer />
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
