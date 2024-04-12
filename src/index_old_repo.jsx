import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserPage from "./components/UserPage";
import AdminPage from "./components/AdminPage";
import App from "./App";
import { EthProvider } from './contexts/EthContext/'; 

import "./styles.css";
import { UserProvider } from './contexts/UserContext/UserContext';
import { createTheme, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";
import CreateProposal from "./components/Demo/CreateProposal";
 
const defaultTheme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ThemeProvider theme={defaultTheme}>
      <EthProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/vote" element={<App/>}/>
              <Route path="/admin" element={<AdminPage />}/>
              <Route path="/createProposal" element={<CreateProposal />}/>
            </Routes>
          </Router>
        </UserProvider>
      </EthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
