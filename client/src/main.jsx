import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import ContextProvider from "./context/GlobalContext.jsx";
import { Toaster } from 'react-hot-toast';
import Cart from "./module/cart/Cart.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Router>
      <Cart />
      <Toaster />
      <App />
    </Router>
  </ContextProvider>
);
