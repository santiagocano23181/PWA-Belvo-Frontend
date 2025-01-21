import React, { useState, useEffect } from "react";
import AccountCard from "../../components/AccountCard";
import { useParams, useNavigate } from "react-router-dom";
import { validateSession } from "../../helpers/Session";
import axios from "axios";
import Feedback from "../../components/Feedback";

const ListAccount = () => {
    const { bankName } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState();
    const [page, setPage] = useState(1);
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [feedback, setFeedback] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        const session = validateSession();

        const clearData = async () => {
            setAccount([]);
        };

        const fetchData = async (id) => {
            clearData();
            if (loading) return;
            try {
                setLoading(true);
                const resAccount = await axios.get(
                    `${import.meta.env.VITE_APP_SERVER}/api/v1/accounts/${bankName}?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                            Accept: "application/json",
                        },
                    }
                );
                setNext(resAccount.data.next);
                setPrevious(resAccount.data.previous);
                setAccount(resAccount.data.results);
            } catch (error) {
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
                {account == undefined || account.length === 0
                    ? null
                    : account.map((a) => {
                          return <AccountCard account={a} />;
                      })}
            </div>
            <div className="w-full flex mb-5">
                {previous ? (
                    <button
                        className="w-full mr-3 justify-center flex px-5 p-2 rounded shadow-md  bg-sky-700  hover:bg-sky-900 active:bg-sky-900 transition-colors"
                        onClick={() => {
                            setPage(page - 1);
                            fetchData();
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
                            fetchData();
                        }}
                    >
                        <p className="text-white">Next </p>
                    </button>
                ) : null}
            </div>
        </>
    );
};

export default ListAccount;
