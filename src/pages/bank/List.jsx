import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateSession, upcreateSession } from "../../helpers/Session";
import BankCard from "../../components/BankCard";
import Feedback from "../../components/Feedback";

const BankList = () => {
    const [bank, setBank] = useState();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [feedback, setFeedback] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const session = validateSession();

        const clearData = async () => {
            setBank([]);
        };

        const fetchData = async (id) => {
            clearData();
            if (loading) return;
            try {
                console.log(axios.defaults.baseURL)
                setLoading(true);
                const resBank = await axios.get(`${axios.defaults.baseURL}/api/v1/banks?page=${page}`, {
                    headers: {
                        Authorization: id,
                        Accept: "application/json",
                    },
                    withCredentials: true,
                });
                setNext(resBank.data.next);
                setPrevious(resBank.data.previous);
                setBank(resBank.data.results);
            } catch (error) {
                console.log(error);
                // Error handler
                if (
                    !error.response ||
                    !error.response.data ||
                    error.response.data.status === 500
                ) {
                    setFeedback({
                        messages: "Hubo un error, intentelo más tarde",
                        context: 3,
                    });
                } else {
                    setFeedback(error.response.data);
                }
            } finally {
                setLoading(false); // Restablece la bandera de carga
            }
        };

        if (session) {
            fetchData(session.id);
        } else {
            // Delete session data
            sessionStorage.removeItem("session");
            // Send to login
            navigate("/auth/sign-in");
        }
        return () => axios.CancelToken.source().cancel();
        
    }, [page, navigate]);

    const clearData = async () => {
        setBank([]);
    };

    const updateData = async (id) => {
        try {
            clearData();
            const resBank = await axios.get(`/api/v1/banks?page=${page}`, {
                headers: {
                    Authorization: id,
                },
            });
            setNext(resBank.data.next);
            setPrevious(resBank.data.previous);
            setBank(resBank.data.results);
        } catch (error) {
            console.log(error);
            // Error handler
            if (
                !error.response ||
                !error.response.data ||
                error.response.data.status === 500
            ) {
                setFeedback({
                    messages: "Hubo un error, intentelo más tarde",
                    context: 3,
                });
            } else {
                setFeedback(error.response.data);
            }
        }
    };

    return (
        <>
            {feedback ? (
                <div className="w-full">
                    <Feedback
                        messages={feedback.messages}
                        context={feedback.context}
                    />
                </div>
            ) : null}
            <div className="transition ease-in delay-500 box-border my-0 mx-auto p-0 py-4 w-10/12 sm:w-full sm:max-w-xl md:max-w-2xl lg:md:max-w-4xl xl:md:max-w-6xl 2xl:max-w-screen-xl">
                {bank == undefined || bank.length === 0
                    ? null
                    : bank.map((b) => {
                          return <BankCard bank={b} />;
                      })
                }
            </div>
            <div className="w-full flex mb-5">
                {previous ? (
                    <button
                        className="w-full mr-3 justify-center flex px-5 p-2 rounded shadow-md  bg-sky-700  hover:bg-sky-900 active:bg-sky-900 transition-colors"
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >
                        <p className="text-white">Previous</p>
                    </button>
                ) : null}

                {next ? (
                    <button
                        className="w-full mr-3 justify-center flex px-5 p-2 rounded shadow-md  bg-sky-700  hover:bg-sky-900 active:bg-sky-900 transition-colors"
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >
                        <p className="text-white">Next </p>
                    </button>
                ) : null}
            </div>
        </>
    );
};

export default BankList;
