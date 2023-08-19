import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import Web3 from "./web3.jsx";
import ContextProvider from "./context/GlobalContext.jsx";
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Router>
      {/* <Web3 /> */}
      <App />
      <Toaster />
    </Router>
  </ContextProvider>
);
