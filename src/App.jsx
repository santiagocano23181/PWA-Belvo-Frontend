import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Session from "./helpers/Session";
import Navbar from "./components/NavbarPersonal";
import SignIn from "./pages/auth/SignIn";
import BankList from "./pages/bank/List";
import ListAccount from "./pages/account/ListAccount";
import ListTransaction from "./pages/transaction/ListTransaction";
import SignUp from "./pages/auth/SignUp";

function App() {
    return (
        <>
            <BrowserRouter>
                <Session />
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path="auth">
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp/>} />
                        </Route>
                        <Route path="banks">
                            <Route path="list" element={<BankList/>} />
                            <Route path=":bankName/accounts" element={<ListAccount/>}/>
                            <Route path="accounts/:linkId/transactions/:accountId" element={<ListTransaction/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
