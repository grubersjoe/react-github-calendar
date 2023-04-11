import React, { CSSProperties, FunctionComponent } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  children: string;
  style?: CSSProperties;
};

const CodeBlock: FunctionComponent<Props> = ({ children }) => (
  <SyntaxHighlighter
    language="typescript"
    customStyle={{
      margin: '0 0 1.5rem',
      padding: '1em',
      borderRadius: 4,
      border: 'none',
      lineHeight: 1.3,
    }}
    codeTagProps={{ className: 'syntax-highlighter' }}
    style={theme}
  >
    {children}
  </SyntaxHighlighter>
);

export default CodeBlock;
