import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/latin.css';
import '@fontsource/roboto/latin-400-italic.css';
import '@fontsource/roboto-mono/latin.css';

import Demo from './Demo';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>,
  );
}
