// app/layout.jsx (or layout.js depending on your setup)
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { AppProvider } from '@shopify/polaris';
import { useAppBridge } from '@shopify/app-bridge-react';
import dotenv from 'dotenv';
import '@shopify/polaris/build/esm/styles.css'; // Import Polaris styles
import "./tailwind.css";

dotenv.config();

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="shopify-api-key" content={process.env.SHOPIFY_API_KEY || ''} />
        <script src="https://unpkg.com/@shopify/app-bridge@latest/dist/app-bridge.min.js"></script>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const appBridge = useAppBridge(); // Access App Bridge instance if needed
  return (
    <AppProvider i18n={{}} theme={{}}>
      <Layout>
        <div style={{ padding: '20px' }}>
          <Outlet />
        </div>
      </Layout>
    </AppProvider>
  );
}
