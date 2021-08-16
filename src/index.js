import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <App />
          </Switch>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
