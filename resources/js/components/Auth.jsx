export const logout = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    window.location.href = '/login';   // Redirect to login page
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');  // Returns true if token exists, false otherwise
};
