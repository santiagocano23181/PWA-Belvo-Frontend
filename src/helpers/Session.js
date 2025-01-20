import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const validateSession = () => {
    // Check if session exist
    const storage = sessionStorage.getItem("session");

    if (storage) {
        // Parse to object
        const session = JSON.parse(storage);

        // Check if time is not expired
        if (parseInt(session.time) > new Date().getTime()) {
            upcreateSession(session.id);
            return session;
        }
    }

    return null;
};

export const upcreateSession = (id, role) => {
    // Genertate time
    const ms = 3600000;
    const date = new Date(Date.now() + ms);
    
    // Save session
    const data = {
        id: id,
        time: date.getTime().toString(),
    }
    sessionStorage.setItem(
        "session",
        JSON.stringify(data)
    );
};

const Session = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            // Check if session exist
            const storage = sessionStorage.getItem("session");

            if (storage) {
                // Parse to object
                const session = JSON.parse(storage);

                // Check if time is not expired
                if (parseInt(session.time) < new Date().getTime()) {
                    // Delete session data
                    sessionStorage.removeItem("session");

                    // Send to sign in
                    navigate("/auth/sign-in");
                }
            }
        }, parseInt(import.meta.env.VITE_APP_SESSION_TIME));

        return () => clearInterval(interval);
    }, [navigate]);

    return null;
};

export default Session;
