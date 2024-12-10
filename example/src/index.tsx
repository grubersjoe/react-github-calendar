import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Docs from './components/Docs';

const container = document.getElementById('root');

if (!container) {
  throw Error('#root not found');
}

const root = createRoot(container);

const router = createHashRouter([
  {
    path: '/*',
    element: <Docs />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
