import React from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated, logout } from "../components/Auth";

const LeaftMenue = () => {
    const isAuth = isAuthenticated();

    return (
        <>
            <div className="wrapper d-flex h-100">
                <nav id="mainSidebar" className="h-100">
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <div className="d-flex align-items-center justify-content-between mb-3 mb-md-0 me-md-auto w-100">
                            <span className="fs-4 logo-lg only-d-lg">logo</span>

                            <span className="d-none" id="sidebarUntoggleBtn">
                                <i className="bi bi-x-circle-fill"></i>
                            </span>
                        </div>

                        <ul className="nav nav-pills flex-column mb-auto">
                            {isAuth && (
                                <>
                                    <p className="mt-2 mb-1 text-secondary text-small">
                                        DASHBOARD
                                    </p>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/"
                                            className="nav-link active"
                                            aria-current="page"
                                        >
                                            <i className="bi bi-house-door-fill me-2"></i>
                                            Home
                                        </NavLink>
                                    </li>

                                    <p className="mt-2 mb-1 text-secondary text-small">
                                        PRODUCTS
                                    </p>
                                    <li>
                                        <NavLink
                                            to="/products"
                                            className="nav-link active"
                                            aria-current="page"
                                        >
                                            <i className="bi bi-table me-2"></i>
                                            Products
                                        </NavLink>
                                    </li>

                                    <p className="mt-2 mb-1 text-secondary text-small">
                                        ACCOUNTS
                                    </p>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            {" "}
                                            <i className="bi bi-box-arrow-right me-2"></i>{" "}
                                            Sign in
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            <i className="bi bi-person-circle me-2"></i>
                                            Registration
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            <i className="bi bi-at me-2"></i>My
                                            Profile
                                        </NavLink>
                                    </li>

                                    <p className="mt-2 mb-1 text-secondary text-small">
                                        USERS
                                    </p>
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            <i className="bi bi-file-font me-2"></i>
                                            Users
                                        </NavLink>
                                    </li>

                                    <p className="mt-2 mb-1 text-secondary text-small">
                                        OTHERS
                                    </p>
                                    <li>
                                        <a
                                            href="../404/index.html"
                                            className="nav-link"
                                        >
                                            <i className="bi bi-4-circle-fill me-2"></i>
                                            404
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="../blank-page/index.html"
                                            className="nav-link"
                                        >
                                            <i className="bi bi-file-earmark-fill me-2"></i>
                                            Blank Page
                                        </a>
                                    </li>

                                    <li>
                                        <NavLink to="/logout" className="nav-link">
                                            <i className="bi bi-file-earmark-text me-2"></i>
                                            Logout
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default LeaftMenue;
