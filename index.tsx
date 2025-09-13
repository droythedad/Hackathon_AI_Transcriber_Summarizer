import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("index.tsx: Module loaded successfully.");

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Fatal Error: Could not find the root element in the HTML to mount the application to. Please check your index.html file.");
  }

  console.log("index.tsx: Found root element. Creating React root.");
  const root = ReactDOM.createRoot(rootElement);

  console.log("index.tsx: Rendering the App component.");
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("index.tsx: App component has been rendered.");

} catch (error) {
  console.error("A fatal error occurred during application startup:", error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const errorDetails = error instanceof Error ? `${error.name}: ${error.message}\n${error.stack}` : String(error);
    rootElement.innerHTML = `
      <div style="color: #cbd5e1; font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1 style="color: #f87171; font-size: 1.5rem;">Application Failed to Load</h1>
        <p style="margin-top: 1rem;">A critical error prevented the app from starting. Please check the developer console for more details.</p>
        <pre style="background-color: #1e293b; border: 1px solid #334155; padding: 1rem; border-radius: 0.5rem; text-align: left; margin-top: 1.5rem; white-space: pre-wrap; word-break: break-all;">${errorDetails}</pre>
      </div>
    `;
  }
}