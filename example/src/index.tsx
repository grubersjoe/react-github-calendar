import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Demo from './components/Demo.tsx';

const container = document.getElementById('root');

if (!container) {
  throw Error('#root not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
