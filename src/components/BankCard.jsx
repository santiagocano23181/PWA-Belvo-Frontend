import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const BankCard = ({ bank }) => {
    const navigate = useNavigate();
    
    return (
        <div
            className="min-w-[10rem] text-black rounded-md hover:text-gray-600 hover:scale-110 duration-200 bg-slate-100 border border-gray-300 shadow-sm hover:shadow-md my-5"
            key={bank.id}
            onClick={() => {
                navigate(`/banks/${bank.name}/accounts` );
            }}
        >
            <div className={"bg-white h-40 bg-cover bg-center m-2 relative"}>
                <div className="opacity-25 h-full z-40 absolute w-full object-cover"></div>

                {bank ? (
                    <img
                        src={bank.logo}
                        alt={bank.name}
                        className="h-40 object-cover -z-30 w-full"
                    />
                ) : (
                    <div className="h-40 object-cover -z-30 w-full" />
                )}
            </div>
            <div className="py-4 px-2">
                <h2
                    className={`my-2 font-medium overflow-hidden text-[${bank.primary_color}]`}
                >
                    {bank.display_name}
                </h2>
            </div>
        </div>
    );
};

export default BankCard;
