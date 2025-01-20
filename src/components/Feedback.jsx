import React from "react";

const Feedback = ({ messages, context }) => {
    return (
        <div
            className={`w-full flex rounded shadow-md py-3 px-5 border ${
                context === 0
                    ? "bg-green-200 border-green-700"
                    : context === 1
                    ? "bg-blue-200 border-blue-700"
                    : context === 2
                    ? "bg-orange-200 border-orange-700"
                    : "bg-red-200 border-red-700"
            } `}
        >
            <p
                className={`font-semibold my-auto ${
                    context === 0
                        ? "text-green-700"
                        : context === 1
                        ? "text-blue-700"
                        : context === 2
                        ? "text-orange-700"
                        : "text-red-700"
                }`}
            >
                {messages}
            </p>
        </div>
    );
};

export default Feedback;
