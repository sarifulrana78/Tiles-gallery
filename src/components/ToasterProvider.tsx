"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  console.log("ToasterProvider is rendering in the browser...");
  return (
    <Toaster 
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#000',
          color: '#fff',
          borderRadius: '0px',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        success: {
          iconTheme: {
            primary: '#fff',
            secondary: '#000',
          },
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
          },
          iconTheme: {
            primary: '#b91c1c',
            secondary: '#fee2e2',
          },
        },
      }}
    />
  );
}
