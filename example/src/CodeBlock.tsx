import React, { CSSProperties, FunctionComponent, HTMLAttributes } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

SyntaxHighlighter.registerLanguage('typescript', ts);

type Props = HTMLAttributes<HTMLPreElement> & {
  style?: CSSProperties;
};

const CodeBlock: FunctionComponent<Props> = ({ children }) => (
  <SyntaxHighlighter language="typescript" style={theme}>
    {children}
  </SyntaxHighlighter>
);

export default CodeBlock;
