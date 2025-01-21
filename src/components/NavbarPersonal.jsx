import React, { useEffect, useState } from "react";
import logo from "/pwa-512x512.png";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { validateSession } from "../helpers/Session";
import axios from "axios";

const NavbarPersonal = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        // Validate session
        const session = validateSession();
        if (!session && !location.pathname.includes('sign-up') ) {
            navigate("/auth/sign-in");
        }

        return () => axios.CancelToken.source().cancel();
    }, [navigate]);

    return (
        <>
            <div className="bg-sky-900 flex justify-between items-center h-20 mx-auto px-4 text-white">
                <img src={logo} className="w-10 h-min m-6 rounded-md" />
                <h1 className="w-full text-3xl font-bold text-slate-50">
                    Belvo PWA.
                </h1>
            </div>
            <Outlet />
        </>
    );
};

export default NavbarPersonal;
