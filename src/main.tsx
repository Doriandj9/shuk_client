import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import core_es from '@core/translations/es/core.json';
import core_en from '@core/translations/en/core.json';
import {LanguageApp} from '@/config/@types/app';
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';


let lngDefault: LanguageApp = 'es';

if(localStorage.languageApp){
  const op = localStorage.languageApp;

  switch(op){
    case 'es': 
        lngDefault = 'es';
    break;

    case 'en': 
        lngDefault = 'en';
    break;

    default: 
        lngDefault= 'es';
}
}

i18next.init({
  lng: lngDefault,
  interpolation: { escapeValue: true },
  resources: {
    es: {
      core: core_es
    },
    en: {
      core: core_en
    }
  }
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
    <QueryClientProvider client={client}>
      <Router>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
