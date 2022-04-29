import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import {green} from "@mui/material/colors";
import Loader from "./components/reusable/Loader";

/* Default Theme */
const theme = createTheme({
    typography: {
        fontSize: 12,
    },
    palette: {
        primary: {main: '#032746'},
        secondary: {main: '#830f0f'},
        common: {main: green[900]}
    }
});

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
        <Loader />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
