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
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
  </GoogleOAuthProvider>
);
