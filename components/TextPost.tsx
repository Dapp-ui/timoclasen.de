import Image from 'next/image';
import type { ReactNode } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import type { Element } from 'react-markdown/lib/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import styleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';
import styleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

import { TextBlock } from './TextBlock';
import { useTheme } from './ThemeContext';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface ParagraphProps {
  node: Element;
  children: ReactNode;
}

function Paragraph({ node, children }: ParagraphProps) {
  const domNode = node as unknown as HTMLElement;
  if (domNode.children[0].tagName === 'image') {
    const imageNode = domNode.children[0] as HTMLImageElement;
    return (
      <div className="aspect-w-3 aspect-h-2 rounded-md bg-dark bg-opacity-10 dark:bg-light dark:bg-opacity-10">
        <Image
          src={`https:${imageNode.src}`}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          sizes="90vw"
          quality={60}
          alt={imageNode.alt}
        />
      </div>
    );
  }
  return <p>{children}</p>;
}

interface CodeProps {
  node: Element;
}

interface CodeNode {
  type: string;
  value: string;
}

function Code({ node }: CodeProps) {
  const domNode = node as unknown as HTMLElement;
  const { darkMode } = useTheme();
  const style = darkMode ? styleDark : styleLight;
  const codeNode = domNode.children[0].children[0] as unknown as CodeNode;
  const text = codeNode.value.replace(/\n$/, '');

  return (
    <SyntaxHighlighter style={style} language="jsx">
      {text}
    </SyntaxHighlighter>
  );
}

const components: Components = {
  p: Paragraph,
  pre: Code,
};

interface Props {
  children: string;
}

export function TextPost({ children }: Props) {
  return (
    <TextBlock>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </TextBlock>
  );
}
