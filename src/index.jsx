import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import ErrorBoundary from './errorBoundary';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<ErrorBoundary>
            <App />
            </ErrorBoundary>);
