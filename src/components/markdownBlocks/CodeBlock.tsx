import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { twilight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useDarkMode } from 'src/components/DarkModeProvider';

export default function CodeBlock({ node, inline, className, children, ...props }: any) {
	const match = /language-(\w+)/.exec(className || '');
	const theme = useDarkMode();

	// TODO code copy button
	return inline ? (
		// 강조 (``)
		<code
			style={{
				background:
					'linear-gradient( to right, var(--sub-highlight-color) 15%, var(--highlight-color) 85%, var(--sub-highlight-color) )',
				padding: '2px',
				borderRadius: '7px',
			}}
			{...props}
		>
			{children}
		</code>
	) : match ? (
		// 코드 (```)
		<SyntaxHighlighter style={theme} language={match[1]} {...props}>
			{String(children)
				.replace(/\n$/, '')
				.replace(/\n&nbsp;\n/g, '')
				.replace(/\n&nbsp\n/g, '')}
		</SyntaxHighlighter>
	) : (
		<SyntaxHighlighter style={theme} language="textile" {...props}>
			{String(children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	);
}
