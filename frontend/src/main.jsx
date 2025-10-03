import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";
import { Provider } from "react-redux"; // ✅ added
import store, { persistor } from "./redux/store.js"; // ✅ combined import
import { PersistGate } from "redux-persist/integration/react";
import { SearchProvider } from "./utils/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
