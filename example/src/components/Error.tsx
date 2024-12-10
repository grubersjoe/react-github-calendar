import type { FallbackProps } from 'react-error-boundary';

export const errorRenderer = ({ error }: FallbackProps) => (
  <div className="error">
    <b>Error</b>
    {error instanceof Error ? (
      <>
        <br />
        {error.message}
      </>
    ) : null}
  </div>
);
