import { createContext, useContext, useState } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [showUserProfile, setShowUserProfile] = useState(false);

    return (
        <UserProfileContext.Provider value={{ showUserProfile, setShowUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);
