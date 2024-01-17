import { FallbackProps } from 'react-error-boundary';

export const errorRenderer = ({ error }: FallbackProps) => (
  <div className="error">
    <b>Error</b>
    <br />
    {error.message}
  </div>
);
