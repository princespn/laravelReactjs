import React, { useEffect } from 'react';
import { logout } from '../components/Auth';

export const LogoutPage = () => {
    useEffect(() => {
        logout();  // Call the logout function when the component mounts
    }, []);

    return (
        <div>Logging out...</div>
    );
};
