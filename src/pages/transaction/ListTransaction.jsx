import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validateSession } from "../../helpers/Session";
import axios from "axios";
import Feedback from "../../components/Feedback";

const ListTransaction = () => {
    const { linkId, accountId } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState();
    const [feedback, setFeedback] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        const session = validateSession();

        const clearData = async () => {
            setTransaction([]);
        };

        const fetchData = async (id) => {
            clearData();
            if (loading) return;
            try {
                console.log(axios.defaults.baseURL)
                setLoading(true);
                const resTransaction = await axios.get(
                    `/api/v1/transactions/${linkId}/${accountId}`,
                    {
                        headers: {
                            Authorization: id,
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setTransaction(resTransaction.data);
                console.log(resTransaction.data);
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
    }, [navigate]);

    return (
        <>
            <div className="transition ease-in delay-500 box-border my-0 mx-auto p-0 py-4 w-11/12 sm:w-full sm:max-w-xl md:max-w-2xl lg:md:max-w-4xl xl:md:max-w-6xl 2xl:max-w-screen-xl divide-y-4">
                {transaction == undefined || transaction.length === 0 ? null : (
                    <div className="flex w-full text-slate-950 text-left text-4xl h-auto py-10">
                        Total Balance: {transaction.balance}
                    </div>
                )}
                <div className="divide-y-2">
                {transaction == undefined || transaction.length === 0 ? null : (
                    transaction.transactions.map((t) => {
                        return (<div className="grid grid-cols-2 py-3">
                            <div className=" text-slate-950 text-left text-2xl">{t.description}</div>
                            <div className={`${t.type == 'OUTFLOW'? "text-red-800" : "text-slate-700"} text-right text-xl`}>{t.type == 'OUTFLOW'? "-" : null}{t.amount}</div>
                        </div>);
                    })
                )}
                </div>
            </div>
        </>
    );
};

export default ListTransaction;
