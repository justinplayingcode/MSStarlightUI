import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { initializeIcons } from '@fluentui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <App />
)
initializeIcons();
