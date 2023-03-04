import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from "./components/Practice";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Menu />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="create-room" element={<Practice />} />
                    <Route path="join-room" element={<Practice />} />
                    <Route path="*" element={<Menu />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
