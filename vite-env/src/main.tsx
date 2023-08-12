import ReactDOM from 'react-dom/client'
import { initializeIcons } from '@fluentui/react';
import App from './app';
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
initializeIcons();