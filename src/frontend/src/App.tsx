import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";

function App() {
    const mode = "home";
    return (
        <div className="App">
            <header className="App-header">
                <span className="row">
                    <div>{mode}</div>
                    {mode === "home" && <Menu />}
                </span>
            </header>
        </div>
    );
}

export default App;
