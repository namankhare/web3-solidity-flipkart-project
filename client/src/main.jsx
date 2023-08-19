import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import Web3 from "./web3.jsx";





ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Web3 />
    <App />
  </Router>
);
