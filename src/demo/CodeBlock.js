import React from 'react';

const CodeBlock = ({ children, ...props }) => (
  <pre className="code-block" {...props}>
    <code>{children}</code>
  </pre>
);

export default CodeBlock;
