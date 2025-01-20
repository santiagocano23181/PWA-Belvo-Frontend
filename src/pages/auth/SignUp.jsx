import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateSession, upcreateSession } from "../../helpers/Session";
import Feedback from "../../components/Feedback";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const mainInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (validateSession()) {
            // Send to competitions
            navigate("/banks");
        } else {
            sessionStorage.removeItem("session");
        }

        return () => axios.CancelToken.source().cancel();
    }, [navigate]);

    const handlerSubmit = async () => {
        // Start loading and clean feedback
        setLoading(true);
        setFeedback(null);

        try {
            // Get user session
            const res = await axios.post("/api/v1/auth/", {
                email: email,
                password: password,
            });

            setFeedback(res.data);
        } catch (error) {
            // Error handler
            if (
                !error.response ||
                !error.response.data ||
                error.response.data.status === 500
            ) {
                setFeedback({
                    messages: "Algo salio mal",
                    context: 3,
                });
            } else {
                setFeedback(error.response.data);
            }
        }

        // End loading
        setLoading(false);

        // Clean form and focus
        setEmail("");
        setPassword("");

        if (mainInputRef.current) {
            mainInputRef.current.focus();
        }
    };

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center p-0">
                <div className="m-auto">
                    <main className="w-full bg-white rounded shadow-md mx-auto p-5">
                        <div className="w-full mb-7">
                            <p className="w-full text-center text-xl mb-3 font-semibold">
                                Crear cuenta
                            </p>

                            <p className="w-full text-center text-sm">
                                Bienvenido(a)
                            </p>
                        </div>

                        <form
                            className="w-full mb-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handlerSubmit();
                            }}
                        >
                            <div className="w-full">
                                <input
                                    className="w-full mb-3 px-5 p-2 rounded bg-gray-100 focus:outline-none"
                                    placeholder="Correo electronico"
                                    type="email"
                                    autoFocus
                                    required
                                    value={email}
                                    ref={mainInputRef}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <input
                                    className="w-full mb-3 px-5 p-2 rounded bg-gray-100 focus:outline-none"
                                    placeholder="Contraseña"
                                    type="password"
                                    required
                                    pattern=".{8,}"
                                    title="Debe tener un minimo de 8 caracteres"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex mb-5">
                                    <button
                                        className="w-full mr-3 justify-center flex px-5 p-2 rounded shadow-md  bg-sky-700  hover:bg-sky-900 active:bg-sky-900 transition-colors"
                                        type="submit"
                                    >
                                        <p className="text-white">Enviar</p>
                                    </button>

                                    <Link
                                        to="/auth/sign-in"
                                        className="w-full text-center my-auto"
                                    >
                                        <p className="text-sm text-gray-500 hover:text-black transition-colors">
                                            Iniciar sesión
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </main>

                    {feedback ? (
                        <div className="w-full mt-7">
                            <Feedback
                                messages={feedback.messages}
                                context={feedback.context}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default SignUp;
