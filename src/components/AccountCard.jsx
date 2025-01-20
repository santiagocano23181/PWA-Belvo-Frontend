import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const AccountCard = ({ account }) => {
    const navigate = useNavigate();
    return (
        <div
            className="min-w-[10rem] text-black rounded-md hover:text-gray-600 hover:scale-110 duration-200 bg-slate-100 border border-gray-300 shadow-sm hover:shadow-md my-5"
            key={account.id}
            onClick={() => {
                navigate(`/banks/accounts/${account.link}/transactions/${account.id}`);
            }}
        >
            <div className="py-4 px-2">
                <h2
                    className={`my-2 font-medium overflow-hidden text-slate-900`}
                >
                    {account.name}
                </h2>
            </div>
            <div className="py-4 px-2">
                <h3
                    className={`my-2 font-medium overflow-hidden text-slate-500`}
                >
                    {account.number}
                </h3>
            </div>

        </div>
    );
};

export default AccountCard;
