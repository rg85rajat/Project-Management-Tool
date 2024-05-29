import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { UIRouter } from "./UIWINDOW/index.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-datepicker/dist/react-datepicker.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={UIRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
);
