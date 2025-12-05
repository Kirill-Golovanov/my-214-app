// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// // src/main.tsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { store } from "./app/store";
// import App from "./App";
// import "./index.css";

// import { queryClient } from "./lib/queryClient";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </QueryClientProvider>
//     </Provider>
//   </React.StrictMode>
// );


// // src/main.tsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { store } from "./app/store";
// import { queryClient } from "./lib/queryClient"; // Импортируем настроенный клиент
// import App from "./App";
// import "./index.css";

// // Безопасная инициализация root
// const rootElement = document.getElementById("root");
// if (!rootElement) {
//   throw new Error("Root element not found");
// }

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </QueryClientProvider>
//     </Provider>
//   </React.StrictMode>
// );




// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store";
import { queryClient } from "./lib/queryClient"; // Импортируем настроенный клиент
import App from "./App";
import "./index.css";

// В main.tsx — добавь внизу
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";





// Безопасная инициализация root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 2500,
            style: {
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "1rem",
            },
            success: {
              icon: "✓",
            },
          }}
        />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
