import React, { CSSProperties, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLPreElement> & {
  style?: CSSProperties;
};

const CodeBlock: React.FC<Props> = ({ children, ...props }) => (
  <pre className="code-block" {...props}>
    <code>{children}</code>
  </pre>
);

export default CodeBlock;
