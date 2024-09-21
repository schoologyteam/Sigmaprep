import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

/**
 *
 * @param {Object} props
 * @param {String} props.render
 * @param {String} props.components
 * @returns
 */
export default function MarkdownRenderer({ render, components }) {
  if (!render.includes('$') && !render.includes('/') && !render.includes('#')) {
    return <span>{render}</span>;
  } else {
    return (
      <ReactMarkdown
        components={{ ...components }}
        //{...props}
        children={render}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    );
  }
}
